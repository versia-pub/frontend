import type { Attachment, Status, StatusSource } from "@versia/client/schemas";
import { defineStore } from "pinia";
import type { z } from "zod";

export interface ComposerFile {
    id: string;
    apiId?: string;
    file?: File;
    alt?: string;
    uploading: boolean;
    updating: boolean;
}

export interface ComposerState {
    relation?: {
        type: "reply" | "quote" | "edit";
        note: z.infer<typeof Status>;
        source?: z.infer<typeof StatusSource>;
    };
    content: string;
    rawContent: string;
    sensitive: boolean;
    contentWarning: string;
    contentType: "text/html" | "text/plain";
    visibility: z.infer<typeof Status.shape.visibility>;
    files: ComposerFile[];
    sending: boolean;
}

export type ComposerStateKey =
    | "blank"
    | `${NonNullable<ComposerState["relation"]>["type"]}-${string}`;

export const calculateMentionsFromReply = (
    note: z.infer<typeof Status>,
): string => {
    const authStore = useAuthStore();

    const peopleToMention = note.mentions
        .concat(note.account)
        // Deduplicate mentions
        .filter((men, i, a) => a.indexOf(men) === i)
        // Remove self
        .filter((men) => men.id !== authStore.identity.account.id);

    if (peopleToMention.length === 0) {
        return "";
    }

    const mentions = peopleToMention.map((me) => `@${me.acct}`).join(" ");

    return `${mentions} `;
};

export const useComposerStore = (key: ComposerStateKey) =>
    defineStore(`composer-${key}`, {
        state: (): ComposerState => ({
            relation: undefined,
            content: "",
            rawContent: "",
            sensitive: false,
            contentWarning: "",
            contentType: "text/html",
            visibility: "public",
            files: [],
            sending: false,
        }),
        getters: {
            characterCount: (state) => {
                return state.rawContent.length;
            },
            isOverCharacterLimit(): boolean {
                const authStore = useAuthStore();
                const characterLimit =
                    authStore.identity.instance.configuration.statuses
                        .max_characters;

                return this.characterCount > characterLimit;
            },
            /* Cannot send if content is empty or over character limit, unless media is attached */
            canSend(state): boolean {
                if (state.sending) {
                    return false;
                }

                if (this.isOverCharacterLimit) {
                    return false;
                }

                return this.characterCount > 0 || state.files.length > 0;
            },
        },
        actions: {
            async stateFromRelation(
                relationType: "reply" | "quote" | "edit",
                note: z.infer<typeof Status>,
                source?: z.infer<typeof StatusSource>,
            ): Promise<ComposerStateKey> {
                const key = `${relationType}-${note.id}` as const;

                this.$patch({
                    relation: {
                        type: relationType,
                        note,
                        source,
                    },
                    content: calculateMentionsFromReply(note),
                    contentWarning: source?.spoiler_text || note.spoiler_text,
                    sensitive: note.sensitive,
                    files: [],
                    sending: false,
                    contentType: "text/html",
                    visibility: note.visibility,
                });

                if (relationType === "edit") {
                    this.content = source?.text || note.content;
                    this.rawContent = source?.text || "";
                    this.files = await Promise.all(
                        note.media_attachments.map(async (file) => ({
                            id: crypto.randomUUID(),
                            apiId: file.id,
                            alt: file.description ?? undefined,
                            uploading: false,
                            updating: false,
                        })),
                    );
                }

                return key;
            },
            async uploadFile(file: File): Promise<void> {
                const index =
                    this.files.push({
                        file,
                        uploading: true,
                        updating: false,
                        id: crypto.randomUUID(),
                    }) - 1;

                const authStore = useAuthStore();

                return authStore.client
                    .uploadMedia(file)
                    .then((media) => {
                        if (!this.files[index]) {
                            throw new Error("File not found");
                        }

                        this.files[index].uploading = false;
                        this.files[index].apiId = (
                            media.data as z.infer<typeof Attachment>
                        ).id;
                    })
                    .catch(() => {
                        this.files.splice(index, 1);
                    });
            },
            async updateFileDescription(
                id: string,
                description: string,
            ): Promise<void> {
                const index = this.files.findIndex((f) => f.id === id);
                if (index === -1 || !this.files[index]) {
                    throw new Error("File not found");
                }

                this.files[index].updating = true;

                const authStore = useAuthStore();

                try {
                    await authStore.client.updateMedia(
                        this.files[index].apiId ?? "",
                        {
                            description: description,
                        },
                    );
                } finally {
                    if (this.files[index]) {
                        this.files[index].updating = false;
                        this.files[index].alt = description;
                    }
                }
            },
            async sendEdit(): Promise<z.infer<typeof Status> | null> {
                if (!this.canSend || this.relation?.type !== "edit") {
                    return null;
                }

                const authStore = useAuthStore();

                this.sending = true;

                try {
                    const { data } = await authStore.client.editStatus(
                        this.relation.note.id,
                        {
                            status: this.content,
                            content_type: this.contentType,
                            sensitive: this.sensitive,
                            spoiler_text: this.sensitive
                                ? this.contentWarning
                                : undefined,
                            media_ids: this.files
                                .map((f) => f.apiId)
                                .filter((f) => f !== undefined),
                        },
                    );

                    this.sending = false;
                    return data;
                } catch (error) {
                    this.sending = false;
                    throw error;
                }
            },
            async send(): Promise<z.infer<typeof Status> | null> {
                if (!this.canSend) {
                    return null;
                }

                const authStore = useAuthStore();

                this.sending = true;

                try {
                    const { data } = await authStore.client.postStatus(
                        this.content,
                        {
                            content_type: this.contentType,
                            sensitive: this.sensitive,
                            spoiler_text: this.sensitive
                                ? this.contentWarning
                                : undefined,
                            media_ids: this.files
                                .map((f) => f.apiId)
                                .filter((f) => f !== undefined),
                            quote_id:
                                this.relation?.type === "quote"
                                    ? this.relation.note.id
                                    : undefined,
                            in_reply_to_id:
                                this.relation?.type === "reply"
                                    ? this.relation.note.id
                                    : undefined,
                            visibility: this.visibility,
                        },
                    );

                    this.sending = false;
                    return data as z.infer<typeof Status>;
                } catch (error) {
                    this.sending = false;
                    throw error;
                }
            },
        },
        persist: {
            serializer: {
                serialize(data) {
                    // Delete file references before storing to avoid large storage usage
                    const newFiles = (data as ComposerState).files.map((f) => {
                        const { file, ...rest } = f;

                        return rest;
                    });

                    return JSON.stringify({ ...data, files: newFiles });
                },
                deserialize(str) {
                    return JSON.parse(str);
                },
            },
            storage: {
                // Store everything in "composer" key to avoid creating too many entries
                getItem(key) {
                    return JSON.stringify(
                        JSON.parse(localStorage.getItem("composer") || "{}")[
                            key
                        ],
                    );
                },
                setItem(key, value) {
                    const composer = JSON.parse(
                        localStorage.getItem("composer") || "{}",
                    );
                    composer[key] = JSON.parse(value);
                    localStorage.setItem("composer", JSON.stringify(composer));
                },
            },
        },
    });
