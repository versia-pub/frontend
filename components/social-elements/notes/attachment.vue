<template>
    <div tabindex="0" aria-label="Open attachment in lightbox"
        class="aspect-video w-full rounded ring-white/5 shadow overflow-hidden ring-1 hover:ring-2 duration-100">
        <img v-if="attachment.type === 'image'" tabindex="-1"
            class="object-cover w-full h-full rounded duration-150 hover:scale-[102%] ease-in-out" :src="attachment.url"
            :alt="attachment.description ?? ''" :title="attachment.description ?? ''" @click="openLightbox"
            @keydown="openLightbox" />
        <video v-else-if="attachment.type === 'video'" class="object-cover w-full h-full rounded" controls
            :alt="attachment.description ?? ''" :title="attachment.description ?? ''">
            <source :src="attachment.url" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
</template>

<script lang="ts" setup>
import type { Attachment } from "~/types/mastodon/attachment";

const props = defineProps<{
    attachment: Attachment;
}>();

const openLightbox = () => {
    useEvent("attachment:view", props.attachment);
};
</script>