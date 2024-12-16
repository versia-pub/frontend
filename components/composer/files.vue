<template>
    <FilePreview v-for="(file, index) in files" :key="file.apiId" :file="file" @update:file="files[index] = $event" @remove="files.splice(index, 1)" />
</template>

<script lang="ts" setup>
import FilePreview from "./file-preview.vue";

defineModel<
    {
        apiId?: string;
        file: File;
        alt?: string;
        uploading: boolean;
        updating: boolean;
    }[]
>("files", {
    required: true,
});
</script>