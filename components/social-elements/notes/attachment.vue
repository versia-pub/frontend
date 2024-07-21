<template>
    <div class="aspect-video relative">
        <div tabindex="0" aria-label="Open attachment in lightbox" role="button"
            class="w-full h-full rounded ring-white/5 shadow overflow-hidden ring-1 hover:ring-2 duration-100 relative">
            <img v-if="attachment.type === 'image'"
                class="object-cover w-full h-full rounded duration-150 hover:scale-[102%] ease-in-out"
                :src="attachment.url" :alt="attachment.description ?? undefined" @click="openLightbox"
                @keydown="openLightbox" />
            <video v-else-if="attachment.type === 'video'" class="object-contain w-full h-full rounded aspect-video"
                controls :alt="attachment.description ?? undefined" :src="attachment.url">
                Your browser does not support the video tag.
            </video>
            <a v-else class="bg-background-800 w-full h-full rounded flex items-center justify-center"
                :href="attachment.url" target="_blank" download>
                <div class="flex flex-col items-center gap-2 text-center max-w-56 overflow-hidden text-ellipsis">
                    <iconify-icon icon="tabler:file" width="none" class="size-10 text-text-300" />
                    <p class="text-text-300 text-sm font-mono">{{ getFilename(attachment.url) }}</p>
                    <p class="text-text-300 text-xs" v-if="attachment.meta?.length">{{
                        formatBytes(Number(attachment.meta?.length)) }}</p>
                </div>
            </a>
        </div>
        <!-- Alt text viewer -->
        <Popover.Root :positioning="{
            strategy: 'fixed',
        }" v-if="attachment.description">
            <Popover.Trigger aria-hidden="true"
                class="absolute top-2 right-2 p-1 bg-background-800 ring-1 ring-white/5 text-white text-xs rounded size-8">
                <iconify-icon icon="tabler:alt" width="none" class="size-6" />
            </Popover.Trigger>
            <Popover.Positioner class="!z-10">
                <Popover.Content
                    class="p-4 bg-background-400 rounded text-sm ring-1 ring-background-100 shadow-lg text-text-300">
                    <Popover.Description>{{ attachment.description }}</Popover.Description>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    </div>
</template>

<script lang="ts" setup>
import { Popover } from "@ark-ui/vue";
import type { Attachment } from "@lysand-org/client/types";

const props = defineProps<{
    attachment: Attachment;
}>();

const openLightbox = () => {
    useEvent("attachment:view", props.attachment);
};

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

const getFilename = (url: string) => {
    // Handle proxy case
    if (url.includes("/media/proxy")) {
        // Decode last part of URL as base64url, which is the real URL
        const realUrl = atob(url.split("/").pop() ?? "");
        return decodeURIComponent(
            realUrl.substring(realUrl.lastIndexOf("/") + 1),
        );
    }
    const path = new URL(url).pathname;
    return path.substring(path.lastIndexOf("/") + 1);
};
</script>