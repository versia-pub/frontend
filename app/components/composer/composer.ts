import type { ResponseError } from "@versia/client";
import type { Attachment, Status, StatusSource } from "@versia/client/schemas";
import { AtSign, Globe, Lock, LockOpen } from "lucide-vue-next";
import type { FunctionalComponent } from "vue";
import { toast } from "vue-sonner";
import type { z } from "zod";
import * as m from "~~/paraglide/messages.js";

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
    files: {
        apiId?: string;
        file: File;
        alt?: string;
        uploading: boolean;
        updating: boolean;
    }[];
    sending: boolean;
    canSend: boolean;
}

const { play } = useAudio();
export const state = reactive<ComposerState>({
    relation: undefined,
    content: "",
    rawContent: "",
    sensitive: false,
    contentWarning: "",
    contentType: "text/html",
    visibility: preferences.default_visibility.value,
    files: [],
    sending: false,
    canSend: false,
});

watch(
    state,
    (newState) => {
        const characterLimit =
            identity.value?.instance.configuration.statuses.max_characters ?? 0;
        const characterCount = newState.rawContent.length;

        state.canSend =
            characterCount > 0
                ? characterCount <= characterLimit
                : newState.files.length > 0;
    },
    { immediate: true },
);

export const visibilities: Record<
    z.infer<typeof Status.shape.visibility>,
    {
        icon: FunctionalComponent;
        name: string;
        text: string;
    }
> = {
    public: {
        icon: Globe,
        name: m.lost_trick_dog_grace(),
        text: m.last_mean_peacock_zip(),
    },
    unlisted: {
        icon: LockOpen,
        name: m.funny_slow_jannes_walk(),
        text: m.grand_strong_gibbon_race(),
    },
    private: {
        icon: Lock,
        name: m.grassy_empty_raven_startle(),
        text: m.white_teal_ostrich_yell(),
    },
    direct: {
        icon: AtSign,
        name: m.pretty_bold_baboon_wave(),
        text: m.lucky_mean_robin_link(),
    },
};

export const getRandomSplash = (): string => {
    const splashes = useConfig().COMPOSER_SPLASHES;

    return splashes[Math.floor(Math.random() * splashes.length)] as string;
};

export const calculateMentionsFromReply = (
    note: z.infer<typeof Status>,
): string => {
    const peopleToMention = note.mentions
        .concat(note.account)
        // Deduplicate mentions
        .filter((men, i, a) => a.indexOf(men) === i)
        // Remove self
        .filter((men) => men.id !== identity.value?.account.id);

    if (peopleToMention.length === 0) {
        return "";
    }

    const mentions = peopleToMention.map((me) => `@${me.acct}`).join(" ");

    return `${mentions} `;
};

const fileFromUrl = (url: URL | string): Promise<File> => {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch file");
        }

        return response.blob().then((blob) => {
            const file = new File([blob], "file", { type: blob.type });
            return file;
        });
    });
};

export const stateFromRelation = async (
    relationType: "reply" | "quote" | "edit",
    note: z.infer<typeof Status>,
    source?: z.infer<typeof StatusSource>,
): Promise<void> => {
    state.relation = {
        type: relationType,
        note,
        source,
    };
    state.content = note.content || calculateMentionsFromReply(note);
    state.rawContent = source?.text || "";

    if (relationType === "edit") {
        state.sensitive = note.sensitive;
        state.contentWarning = source?.spoiler_text || note.spoiler_text;
        state.visibility = note.visibility;
        state.files = await Promise.all(
            note.media_attachments.map(async (file) => ({
                apiId: file.id,
                alt: file.description ?? undefined,
                file: await fileFromUrl(file.url),
                uploading: false,
                updating: false,
            })),
        );
    }
};

export const uploadFile = (file: File): Promise<void> => {
    const index =
        state.files.push({
            file,
            uploading: true,
            updating: false,
        }) - 1;

    return client.value
        .uploadMedia(file)
        .then((media) => {
            if (!state.files[index]) {
                throw new Error("File not found");
            }

            state.files[index].uploading = false;
            state.files[index].apiId = (
                media.data as z.infer<typeof Attachment>
            ).id;
        })
        .catch(() => {
            state.files.splice(index, 1);
        });
};

export const send = async (): Promise<void> => {
    if (state.sending) {
        return;
    }

    state.sending = true;

    try {
        if (state.relation?.type === "edit") {
            const { data } = await client.value.editStatus(
                state.relation.note.id,
                {
                    status: state.content,
                    content_type: state.contentType,
                    sensitive: state.sensitive,
                    spoiler_text: state.sensitive
                        ? state.contentWarning
                        : undefined,
                    media_ids: state.files
                        .map((f) => f.apiId)
                        .filter((f) => f !== undefined),
                },
            );

            useEvent("composer:send-edit", data);
            play("publish");
            useEvent("composer:close");
        } else {
            const { data } = await client.value.postStatus(state.content, {
                content_type: state.contentType,
                sensitive: state.sensitive,
                spoiler_text: state.sensitive
                    ? state.contentWarning
                    : undefined,
                media_ids: state.files
                    .map((f) => f.apiId)
                    .filter((f) => f !== undefined),
                quote_id:
                    state.relation?.type === "quote"
                        ? state.relation.note.id
                        : undefined,
                in_reply_to_id:
                    state.relation?.type === "reply"
                        ? state.relation.note.id
                        : undefined,
                visibility: state.visibility,
            });

            useEvent("composer:send", data as z.infer<typeof Status>);
            play("publish");
            useEvent("composer:close");
        }
    } catch (e) {
        toast.error((e as ResponseError).message);
    } finally {
        state.sending = false;
    }
};
