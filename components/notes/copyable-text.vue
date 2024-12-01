<template>
    <span :class="cn('text-primary group', $props.class)">
        <span class="group-hover:hidden">
            <slot />
        </span>
        <span class="hidden group-hover:inline">
            <span @click="copyText"
                class="select-none cursor-pointer space-x-1">
                <Clipboard class="size-4 -translate-y-0.5 inline" />
                Click to copy
            </span>
        </span>
    </span>
</template>

<script lang="tsx" setup>
import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import { toast } from "vue-sonner";

const { text } = defineProps<{
    text: string;
    class?: HTMLAttributes["class"];
}>();

const { copy } = useClipboard();
const copyText = () => {
    copy(text);
    toast.success("Copied to clipboard");
};
</script>