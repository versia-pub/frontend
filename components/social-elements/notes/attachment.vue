<template>
    <div @click="lightbox = true" tabindex="0" aria-label="Open attachment in lightbox" @keydown="lightbox = true"
        class="aspect-video w-full rounded ring-white/5 shadow overflow-hidden ring-1 hover:ring-2 duration-100">
        <img v-if="attachment.type === 'image'" tabindex="-1"
            class="object-cover w-full h-full rounded duration-150 hover:scale-[102%] ease-in-out" :src="attachment.url"
            :alt="attachment.description ?? ''" :title="attachment.description ?? ''" />
        <video v-else-if="attachment.type === 'video'" class="object-cover w-full h-full rounded" controls
            :alt="attachment.description ?? ''" :title="attachment.description ?? ''">
            <source :src="attachment.url" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
    <HeadlessTransitionRoot appear :show="lightbox" as="template">
        <HeadlessDialog @close="lightbox = false">
            <div class="fixed inset-0 overflow-y-auto z-50 bg-black/70">
                <div class="flex min-h-full items-center justify-center text-center">
                    <HeadlessTransitionChild as="template" enter="duration-100 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100">
                        <HeadlessDialogPanel
                            class="w-screen h-screen flex justify-center items-center flex-col relative overflow-hidden p-10"
                            @click="lightbox = false">
                            <div class="w-full absolute inset-x-0 top-0 p-10 shrink text-gray-400 flex flex-row gap-3">
                                <a @click.stop :href="attachment.url" target="_blank" download class="ml-auto">
                                    <iconify-icon icon="tabler:download" width="1.5rem" height="1.5rem" />
                                    <span class="sr-only">Close</span>
                                </a>
                                <button @click.stop="lightbox = false">
                                    <iconify-icon icon="tabler:x" width="1.5rem" height="1.5rem" />
                                    <span class="sr-only">Close</span>
                                </button>
                            </div>
                            <img @click.stop v-if="attachment.type === 'image'"
                                class="rounded max-w-full min-w-[30%] max-h-[70%]" :src="attachment.url"
                                :alt="attachment.description ?? ''" :title="attachment.description ?? ''" />
                            <span @click.stop v-if="attachment.description"
                                class="text-gray-300 rounded mt-6 -mb-20 px-4 py-2 max-w-xl ring-1 ring-white/5 bg-dark-900 max-h-40 overflow-y-auto">
                                {{ attachment.description }}
                            </span>
                        </HeadlessDialogPanel>
                    </HeadlessTransitionChild>
                </div>
            </div>
        </HeadlessDialog>
    </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
import type { Attachment } from "~/types/mastodon/attachment";

const lightbox = ref(false);

defineProps<{
    attachment: Attachment;
}>();
</script>