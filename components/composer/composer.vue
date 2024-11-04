<template>
    <RespondingTo v-if="respondingTo" :respondingTo="respondingTo" />
    <div class="px-6 pb-4 pt-5">
        <RichTextbox v-model:content="content" :loading="loading" :chosenSplash="chosenSplash" :characterLimit="characterLimit"
            :handle-paste="handlePaste" />
        <ContentWarning v-model:cw="cw" v-model:cwContent="cwContent" />
        <FileUploader :files="files" ref="uploader" @add-file="(newFile) => {
            files.push(newFile);
        }" @change-file="(changedFile) => {
            const index = files.findIndex((file) => file.id === changedFile.id);
            if (index !== -1) {
                files[index] = changedFile;
            }
        }" @remove-file="(id) => {
            files.splice(files.findIndex((file) => file.id === id), 1);
        }" />
        <ActionButtons v-model:content="content" v-model:markdown="markdown" v-model:cw="cw" :loading="loading" :canSubmit="canSubmit"
            :respondingType="respondingType" @send="send" @file-picker-open="openFilePicker" />
    </div>
</template>

<script lang="ts" setup>
import type { Instance, Status } from "@versia/client/types";
import { nanoid } from "nanoid";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useConfig, useEvent, useListen, useMagicKeys } from "#imports";
import ActionButtons from "./action-buttons.vue";
import ContentWarning from "./content-warning.vue";
import RespondingTo from "./responding-to.vue";
import RichTextbox from "./rich-text-box.vue";
// biome-ignore lint/style/useImportType: <explanation>
import FileUploader from "./uploader/uploader.vue";
import type { FileData } from "./uploader/uploader.vue";

const uploader = ref<InstanceType<typeof FileUploader> | undefined>(undefined);
const { Control_Enter, Command_Enter, Control_Alt } = useMagicKeys();
const content = ref("");
const respondingTo = ref<Status | null>(null);
const respondingType = ref<"reply" | "quote" | "edit" | null>(null);
const cw = ref(false);
const cwContent = ref("");
const markdown = ref(true);

const splashes = useConfig().COMPOSER_SPLASHES;
const chosenSplash = ref(
    splashes[Math.floor(Math.random() * splashes.length)] as string,
);

const openFilePicker = () => {
    uploader.value?.openFilePicker();
};

const files = ref<FileData[]>([]);

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
                    uploading: true,
                })),
            );
        }
    }
};

watch(Control_Alt as ComputedRef<boolean>, () => {
    chosenSplash.value = splashes[
        Math.floor(Math.random() * splashes.length)
    ] as string;
});

watch(
    files,
    (newFiles) => {
        loading.value = newFiles.some((file) => file.uploading);
    },
    {
        deep: true,
    },
);

onMounted(() => {
    useListen("composer:reply", (note: Status) => {
        respondingTo.value = note;
        respondingType.value = "reply";
        if (note.account.id !== identity.value?.account.id) {
            content.value = `@${note.account.acct} `;
        }
    });

    useListen("composer:quote", (note: Status) => {
        respondingTo.value = note;
        respondingType.value = "quote";
        if (note.account.id !== identity.value?.account.id) {
            content.value = `@${note.account.acct} `;
        }
    });

    useListen("composer:edit", async (note: Status) => {
        loading.value = true;
        files.value = note.media_attachments.map((file) => ({
            id: nanoid(),
            file: new File([], file.url),
            progress: 1,
            uploading: false,
            api_id: file.id,
            alt_text: file.description ?? undefined,
        }));

        const source = await client.value.getStatusSource(note.id);

        if (source?.data) {
            respondingTo.value = note;
            respondingType.value = "edit";
            content.value = source.data.text;
            cwContent.value = source.data.spoiler_text;
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

const send = async () => {
    if (!(identity.value && client.value)) {
        throw new Error("Not authenticated");
    }

    try {
        loading.value = true;

        if (respondingType.value === "edit" && respondingTo.value) {
            const response = await client.value.editStatus(
                respondingTo.value.id,
                {
                    status: content.value?.trim() ?? "",
                    content_type: markdown.value
                        ? "text/markdown"
                        : "text/plain",
                    spoiler_text: cw.value ? cwContent.value.trim() : undefined,
                    sensitive: cw.value,
                    media_ids: files.value
                        .filter((file) => !!file.api_id)
                        .map((file) => file.api_id) as string[],
                },
            );

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
    } catch (error) {
        console.error(error);
        loading.value = false;
    }
};

const characterLimit = computed(
    () => props.instance?.configuration.statuses.max_characters ?? 0,
);
</script>