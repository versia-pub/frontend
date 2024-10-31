<template>
    <div role="button" tabindex="0" :class="[
        'size-28 bg-dark-800 rounded flex items-center relative justify-center ring-1 ring-white/20 overflow-hidden',
        fileData.uploading && 'animate-pulse'
    ]" @keydown.enter="$emit('remove', fileData.id)">
        <PreviewContent :file="fileData.file" />
        <FileShadowOverlay />
        <FileSize :size="fileData.file.size" :uploading="fileData.uploading" />
        <RemoveButton @remove="$emit('remove', fileData.id)" />
        <AltTextEditor v-if="fileData.api_id" :file-data="fileData"
            @update-alt-text="(text) => $emit('update-alt-text', fileData.id, text)" />
    </div>
</template>

<script lang="ts" setup>
import AltTextEditor from "./alt-text-editor.vue";
import FileShadowOverlay from "./file-shadow-overlay.vue";
import FileSize from "./file-size.vue";
import PreviewContent from "./preview-content.vue";
import RemoveButton from "./remove-button.vue";
import type { FileData } from "./uploader.vue";

defineProps<{
    fileData: FileData;
}>();

defineEmits<{
    remove: [id: string];
    "update-alt-text": [id: string, text?: string];
}>();
</script>