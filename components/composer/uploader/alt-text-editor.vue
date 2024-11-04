<template>
    <Popover.Root :positioning="{
        strategy: 'fixed',
    }" @update:open="o => !o" :close-on-interact-outside="false">
        <Popover.Trigger aria-hidden="true"
            class="absolute top-1 left-1 p-1 bg-dark-800 ring-1 ring-white/5 text-white text-xs rounded size-6">
            <iconify-icon icon="tabler:alt" width="none" class="size-4" />
        </Popover.Trigger>
        <Popover.Positioner class="!z-[100]">
            <Popover.Content
                class="p-1 bg-dark-400 rounded text-sm ring-1 ring-white/10 shadow-lg text-gray-300 w-72 space-y-2">
                <div class="flex items-center justify-between px-1 pt-1 gap-x-1">
                    <Popover.CloseTrigger :as-child="true">
                    <Button theme="outline" aria-label="Close" class="text-xs !p-1">
                        <iconify-icon icon="tabler:x" width="1rem" height="1rem" />
                    </Button>
                    </Popover.CloseTrigger>
                    <h3 class="text-xs font-semibold">Alt Text</h3>
                    <a :href="`https://www.w3.org/WAI/tutorials/images/decision-tree/`" target="_blank"
                        class="text-xs text-gray-300 ml-auto mr-1" title="Learn more about alt text">
                        <iconify-icon icon="tabler:info-circle" width="1rem" height="1rem" />
                    </a>
                </div>
                <PreviewContent :file="fileData.file" class="rounded" />
                <textarea :disabled="fileData.uploading" @keydown.enter.stop v-model="fileData.alt_text"
                    placeholder="Describe this image for screen readers"
                    rows="5"
                    class="w-full p-2 text-sm prose prose-invert bg-dark-900 rounded focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 appearance-none focus:!border-none focus:!outline-none" />
                    <Popover.CloseTrigger :as-child="true">
                <Button theme="secondary" @click="$emit('update-alt-text', fileData.alt_text)" class="w-full"
                    :loading="fileData.uploading">
                    <span>Edit</span>
                </Button>
                </Popover.CloseTrigger>
            </Popover.Content>
        </Popover.Positioner>
    </Popover.Root>
</template>

<script lang="ts" setup>
import { Popover } from "@ark-ui/vue";
import Button from "~/packages/ui/components/buttons/button.vue";
import PreviewContent from "./preview-content.vue";
import type { FileData } from "./uploader.vue";

const props = defineProps<{
    fileData: FileData;
}>();

defineEmits<{
    "update-alt-text": [text?: string];
}>();
</script>