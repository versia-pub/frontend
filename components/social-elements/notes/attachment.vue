<template>
    <div tabindex="0" aria-label="Open attachment in lightbox"
        class="aspect-video w-full rounded ring-white/5 shadow overflow-hidden ring-1 hover:ring-2 duration-100 relative">
        <img v-if="attachment.type === 'image'" tabindex="-1"
            class="object-cover w-full h-full rounded duration-150 hover:scale-[102%] ease-in-out" :src="attachment.url"
            :alt="attachment.description ?? undefined" @click="openLightbox" @keydown="openLightbox" />
        <video v-else-if="attachment.type === 'video'" class="object-contain w-full h-full rounded aspect-video"
            controls :alt="attachment.description ?? undefined" :src="attachment.url">
            Your browser does not support the video tag.
        </video>
        <!-- Alt text viewer -->
        <Popover.Root :positioning="{
            strategy: 'fixed',
        }" v-if="attachment.description">
            <Popover.Trigger
                class="absolute top-2 right-2 p-1 bg-dark-800 ring-1 ring-white/5 text-white text-xs rounded size-8">
                <iconify-icon icon="tabler:alt" width="none" class="size-6" />
            </Popover.Trigger>
            <Popover.Positioner>
                <Popover.Content class="p-4 bg-dark-400 rounded text-sm ring-1 ring-white/10 shadow-lg text-gray-300">
                    <Popover.Title class="font-semibold mb-2">
                        Description</Popover.Title>
                    <Popover.Description>{{ attachment.description }}</Popover.Description>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    </div>
</template>

<script lang="ts" setup>
import { Popover } from "@ark-ui/vue";
import type { Attachment } from "~/types/mastodon/attachment";

const props = defineProps<{
    attachment: Attachment;
}>();

const openLightbox = () => {
    useEvent("attachment:view", props.attachment);
};
</script>