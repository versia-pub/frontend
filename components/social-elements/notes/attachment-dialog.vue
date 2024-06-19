<template>
    <HeadlessTransitionRoot as="template" :show="lightbox">
        <Dialog.Root v-model:open="lightbox" :close-on-escape="true" :close-on-interact-outside="true"
            @update:open="o => lightbox = o">

            <Teleport to="body">
                <Dialog.Positioner class="z-50">
                    <HeadlessTransitionChild as="template" enter="ease-out duration-200" enter-from="opacity-0"
                        enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <Dialog.Backdrop class="fixed inset-0 bg-black/70 !z-40" @click="lightbox = false" />
                    </HeadlessTransitionChild>

                    <Dialog.Content
                        class="w-screen h-screen flex !z-50 justify-center items-center flex-col overflow-hidden p-10 fixed inset-0">
                        <div class="w-full absolute inset-x-0 top-0 p-10 shrink text-gray-400 flex flex-row gap-3">
                            <a @click.stop :href="attachment?.url" target="_blank" download class="ml-auto">
                                <iconify-icon icon="tabler:download" width="1.5rem" height="1.5rem" />
                                <span class="sr-only">Close</span>
                            </a>
                            <button @click.stop="lightbox = false">
                                <iconify-icon icon="tabler:x" width="1.5rem" height="1.5rem" />
                                <span class="sr-only">Close</span>
                            </button>
                        </div>
                        <HeadlessTransitionChild as="template" enter="ease-out duration-200"
                            enter-from="opacity-0 sm:scale-95" enter-to="opacity-100 sm:scale-100"
                            leave="ease-in duration-200" leave-from="opacity-100 sm:scale-100"
                            leave-to="opacity-0 sm:scale-95">
                            <img @click.stop v-if="attachment?.type === 'image'" class="rounded max-w-[70%] max-h-[70%]"
                                :src="attachment.url" :alt="attachment.description ?? ''"
                                :title="attachment.description ?? ''" />
                        </HeadlessTransitionChild>
                        <span @click.stop v-if="attachment?.description"
                            class="text-gray-300 rounded mt-6 -mb-20 px-4 py-2 max-w-xl ring-1 ring-white/5 bg-dark-900 max-h-40 overflow-y-auto">
                            {{ attachment.description }}
                        </span>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Teleport>
        </Dialog.Root>
    </HeadlessTransitionRoot>
</template>t

<script lang="ts" setup>
import { Dialog } from "@ark-ui/vue";
import type { Attachment } from "@lysand-org/client/types";

const lightbox = ref(false);
const attachment = ref<Attachment | null>(null);

useListen("attachment:view", async (a) => {
    attachment.value = a;
    await nextTick();
    lightbox.value = true;
});
</script>