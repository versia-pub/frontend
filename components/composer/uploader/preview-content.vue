<template>
    <template v-if="file.type.startsWith('image/')">
        <img :src="createObjectURL(file)" class="w-full h-full object-cover cursor-default" alt="Preview of file" />
    </template>
    <template v-else-if="file.type.startsWith('video/')">
        <video :src="createObjectURL(file)" class="w-full h-full object-cover cursor-default" />
    </template>
    <template v-else>
        <iconify-icon :icon="getIcon(file.type)" width="none" class="size-6" />
    </template>
</template>

<script lang="ts" setup>
const props = defineProps<{
    file: File;
}>();

const createObjectURL = URL.createObjectURL;

const getIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
        return "tabler:photo";
    }
    if (mimeType.startsWith("video/")) {
        return "tabler:video";
    }
    if (mimeType.startsWith("audio/")) {
        return "tabler:music";
    }
    return "tabler:file";
};
</script>