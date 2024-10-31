<template>
    <Popover.Root :positioning="{
        strategy: 'fixed',
    }" @update:open="o => !o && $emit('update-alt-text', fileData.alt_text)">
        <Popover.Trigger aria-hidden="true"
            class="absolute top-1 left-1 p-1 bg-dark-800 ring-1 ring-white/5 text-white text-xs rounded size-6">
            <iconify-icon icon="tabler:alt" width="none" class="size-4" />
        </Popover.Trigger>
        <Popover.Positioner class="!z-[100]">
            <Popover.Content
                class="p-1 bg-dark-400 rounded text-sm ring-1 ring-white/10 shadow-lg text-gray-300 !min-w-72">
                <textarea :disabled="fileData.uploading" @keydown.enter.stop v-model="fileData.alt_text"
                    placeholder="Add alt text"
                    class="w-full p-2 text-sm prose prose-invert bg-dark-900 rounded focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 appearance-none focus:!border-none focus:!outline-none" />
                <Button theme="secondary" @click="$emit('update-alt-text', fileData.alt_text)" class="w-full"
                    :loading="fileData.uploading">
                    <span>Edit</span>
                </Button>
            </Popover.Content>
        </Popover.Positioner>
    </Popover.Root>
</template>

<script lang="ts" setup>
import { Popover } from "@ark-ui/vue";
import Button from "~/packages/ui/components/buttons/button.vue";
import type { FileData } from "./uploader.vue";

const props = defineProps<{
    fileData: FileData;
}>();

defineEmits<{
    "update-alt-text": [text?: string];
}>();
</script>