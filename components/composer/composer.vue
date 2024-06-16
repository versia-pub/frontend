<template>
    <div v-if="respondingTo" class="mb-4" role="region" aria-label="Responding to">
        <OverlayScrollbarsComponent :defer="true" class="max-h-72 overflow-y-auto">
            <LazySocialElementsNotesNote :note="respondingTo" :small="true" :disabled="true"
                class="!rounded-none !bg-primary-500/10" />
        </OverlayScrollbarsComponent>
    </div>
    <div class="px-6 pb-4 pt-5">
        <div class="pb-2 relative">
            <textarea :disabled="loading" ref="textarea" v-model="content" :placeholder="chosenSplash"
                @paste="handlePaste"
                class="resize-none min-h-48 prose prose-invert max-h-[70dvh] w-full p-0 focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 bg-transparent appearance-none focus:!border-none focus:!outline-none disabled:cursor-not-allowed"
                aria-label="Compose your message"></textarea>
            <div :class="['absolute bottom-0 right-0 p-2 text-gray-400 font-semibold text-xs', remainingCharacters < 0 && 'text-red-500']"
                aria-live="polite">
                {{ remainingCharacters }}
            </div>
            <ComposerEmojiSuggestbox :currently-typing-emoji="currentlyBeingTypedEmoji"
                @autocomplete="autocompleteEmoji" />
        </div>
        <!-- Content warning textbox -->
        <div v-if="cw" class="mb-4">
            <input type="text" v-model="cwContent" placeholder="Add a content warning"
                class="w-full p-2 mt-1 text-sm prose prose-invert bg-dark-900 rounded focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 appearance-none focus:!border-none focus:!outline-none"
                aria-label="Content warning" />
        </div>
        <ComposerFileUploader v-model:files="files" ref="uploader" />
        <div class="flex flex-row gap-1 border-white/20">
            <ComposerButton title="Mention someone">
                <iconify-icon height="1.5rem" width="1.5rem" icon="tabler:at" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Toggle Markdown" @click="markdown = !markdown" :toggled="markdown">
                <iconify-icon width="1.25rem" height="1.25rem"
                    :icon="markdown ? 'tabler:markdown' : 'tabler:markdown-off'" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Use a custom emoji">
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:mood-smile" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add media" @click="openFilePicker">
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:photo-up" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add a file" @click="openFilePicker">
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:file-upload" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add content warning" @click="cw = !cw" :toggled="cw">
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:rating-18-plus" aria-hidden="true" />
            </ComposerButton>
            <ButtonsPrimary :loading="loading" @click="send" class="ml-auto rounded-full"
                :disabled="!canSubmit || loading">
                <span>{{
        respondingType === "edit" ? "Edit!" : "Send!"
                    }}</span>
            </ButtonsPrimary>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { char, createRegExp, exactly } from "magic-regexp";
import { nanoid } from "nanoid";
import type { Instance } from "~/types/mastodon/instance";
import type { Status } from "~/types/mastodon/status";
import { OverlayScrollbarsComponent } from "#imports";
import type FileUploader from "./file-uploader.vue";

const textarea = ref<HTMLTextAreaElement | undefined>(undefined);
const uploader = ref<InstanceType<typeof FileUploader> | undefined>(undefined);
const { input: content } = useTextareaAutosize({
    element: textarea,
});
const { Control_Enter, Command_Enter, Control_Alt } = useMagicKeys();
const respondingTo = ref<Status | null>(null);
const respondingType = ref<"reply" | "quote" | "edit" | null>(null);
const identity = useCurrentIdentity();
const cw = ref(false);
const cwContent = ref("");
const markdown = ref(true);

const splashes = useConfig().COMPOSER_SPLASHES;
const chosenSplash = ref(splashes[Math.floor(Math.random() * splashes.length)]);
const currentlyBeingTypedEmoji = computed(() => {
    const match = content.value?.match(partiallyTypedEmojiValidator);
    return match ? match.at(-1)?.replace(":", "") ?? "" : null;
});

const openFilePicker = () => {
    uploader.value?.openFilePicker();
};

const autocompleteEmoji = (emoji: string) => {
    // Replace the end of the string with the emoji
    content.value = content.value?.replace(
        createRegExp(
            exactly(":"),
            exactly(currentlyBeingTypedEmoji.value ?? "").notBefore(char),
        ),
        `:${emoji}:`,
    );
};

const files = ref<
    {
        id: string;
        file: File;
        progress: number;
        api_id?: string;
        alt_text?: string;
    }[]
>([]);

const handlePaste = (event: ClipboardEvent) => {
    if (event.clipboardData) {
        const items = Array.from(event.clipboardData.items);
        const newFiles = items
            .filter((item) => item.kind === "file")
            .map((item) => item.getAsFile())
            .filter((file): file is File => file !== null);
        if (newFiles.length > 0) {
            event.preventDefault();
            files.value.push(
                ...newFiles.map((file) => ({
                    id: nanoid(),
                    file,
                    progress: 0,
                })),
            );
        }
    }
};

watch(Control_Alt as ComputedRef<boolean>, () => {
    chosenSplash.value = splashes[Math.floor(Math.random() * splashes.length)];
});

watch(
    files,
    (newFiles) => {
        // If a file is uploading, set loading to true
        if (newFiles.some((file) => file.progress < 1)) {
            loading.value = true;
        } else {
            loading.value = false;
        }
    },
    {
        deep: true,
    },
);

onMounted(() => {
    useListen("composer:reply", (note: Status) => {
        respondingTo.value = note;
        respondingType.value = "reply";
        if (note.account.id !== identity.value?.account.id)
            content.value = `@${note.account.acct} `;
        textarea.value?.focus();
    });

    useListen("composer:quote", (note: Status) => {
        respondingTo.value = note;
        respondingType.value = "quote";
        if (note.account.id !== identity.value?.account.id)
            content.value = `@${note.account.acct} `;
        textarea.value?.focus();
    });

    useListen("composer:edit", async (note: Status) => {
        loading.value = true;
        files.value = note.media_attachments.map((file) => ({
            id: nanoid(),
            file: new File([], file.url),
            progress: 1,
            api_id: file.id,
            alt_text: file.description ?? undefined,
        }));

        // Fetch source
        const source = await client.value.getStatusSource(note.id);

        if (source?.data) {
            respondingTo.value = note;
            respondingType.value = "edit";
            content.value = source.data.text;
            cwContent.value = source.data.spoiler_text;
            textarea.value?.focus();
        }

        loading.value = false;
    });
});

watchEffect(() => {
    if (Control_Enter?.value || Command_Enter?.value) {
        send();
    }
});

const props = defineProps<{
    instance: Instance;
}>();

const loading = ref(false);
const canSubmit = computed(
    () =>
        (content.value?.trim().length > 0 || files.value.length > 0) &&
        content.value?.trim().length <= characterLimit.value,
);
const client = useClient();

const send = async () => {
    loading.value = true;
    if (!identity.value || !client.value) {
        throw new Error("Not authenticated");
    }

    if (respondingType.value === "edit" && respondingTo.value) {
        const response = await client.value.editStatus(respondingTo.value.id, {
            status: content.value?.trim() ?? "",
            content_type: markdown.value ? "text/markdown" : "text/plain",
            spoiler_text: cw.value ? cwContent.value.trim() : undefined,
            sensitive: cw.value,
            media_ids: files.value
                .filter((file) => !!file.api_id)
                .map((file) => file.api_id) as string[],
        });

        if (!response.data) {
            throw new Error("Failed to edit status");
        }

        content.value = "";
        loading.value = false;
        useEvent("composer:send-edit", response.data);
        useEvent("composer:close");
        return;
    }

    const response = await client.value.postStatus(
        content.value?.trim() ?? "",
        {
            content_type: markdown.value ? "text/markdown" : "text/plain",
            in_reply_to_id:
                respondingType.value === "reply"
                    ? respondingTo.value?.id
                    : undefined,
            quote_id:
                respondingType.value === "quote"
                    ? respondingTo.value?.id
                    : undefined,
            spoiler_text: cw.value ? cwContent.value.trim() : undefined,
            sensitive: cw.value,
            media_ids: files.value
                .filter((file) => !!file.api_id)
                .map((file) => file.api_id) as string[],
        },
    );

    if (!response.data) {
        throw new Error("Failed to send status");
    }

    content.value = "";
    loading.value = false;
    useEvent("composer:send", response.data as Status);
    useEvent("composer:close");
};

const characterLimit = computed(
    () => props.instance?.configuration.statuses.max_characters ?? 0,
);
const remainingCharacters = computed(
    () => characterLimit.value - (content.value?.length ?? 0),
);
</script>