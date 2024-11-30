<template>
    <span :class="cn('text-primary group', $props.class)">
        <span class="group-hover:hidden">
            <slot />
        </span>
        <span class="hidden group-hover:inline">
            <span @click="copyText" v-if="!hasCopied"
                class="select-none cursor-pointer space-x-1">
                <Clipboard class="size-4 -translate-y-0.5 inline" />
                Click to copy
            </span>
            <span v-else class="select-none space-x-1">
                <Check class="size-4 -translate-y-0.5 inline" />
                Copied!
            </span>
        </span>
    </span>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";

const { text } = defineProps<{
    text: string;
    class?: HTMLAttributes["class"];
}>();

const hasCopied = ref(false);
const { copy } = useClipboard();
const copyText = () => {
    copy(text);
    hasCopied.value = true;
    setTimeout(() => {
        hasCopied.value = false;
    }, 2000);
};
</script>