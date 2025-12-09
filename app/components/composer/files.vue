<template>
    <FilePreview
        v-for="(file, index) in files"
        :key="file.apiId"
        :file="file"
        @update:file="files[index] = $event"
        :composer-key="composerKey"
        @remove="files.splice(index, 1)"
    />
</template>

<script lang="ts" setup>
import type { ComposerStateKey } from "~/stores/composer";
import FilePreview from "./file-preview.vue";

const { composerKey } = defineProps<{
    composerKey: ComposerStateKey;
}>();

const files = defineModel<ComposerFile[]>("files", {
    required: true,
});
</script>
