<template>
    <FilePreview v-for="(file, index) in files" :key="file.apiId" :file="file" @update:file="files[index] = $event"
        @remove="files.splice(index, 1)" />
</template>

<script lang="ts" setup>
import type { ComposerState } from "./composer";
import FilePreview from "./file-preview.vue";

const files = defineModel<ComposerState["files"]>("files", {
    required: true,
});
</script>
