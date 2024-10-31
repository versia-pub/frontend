<template>
    <div class="absolute bottom-1 right-1 p-1 bg-dark-800 text-white text-xs rounded cursor-default flex flex-row items-center gap-x-1"
        aria-label="File size">
        {{ formatBytes(size) }}
        <iconify-icon v-if="uploading" icon="tabler:loader-2" width="none"
            class="size-4 animate-spin text-primary-500" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    size: number;
    uploading: boolean;
}>();

const formatBytes = (bytes: number) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const k = 1000;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};
</script>