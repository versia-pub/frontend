<template>
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-[1fr,auto,auto] gap-4 items-baseline">
            <h2 class="text-xl font-bold">{{ name }}</h2>
            <!-- <Button theme="primary">
                <Icon icon="tabler:upload" />
                <span class="hidden md:block">New</span>
            </Button> -->
            <Button theme="outline">
                <Icon icon="tabler:chevron-up" class="duration-100" :style="{
                    transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                }" @click="collapsed = !collapsed" />
            </Button>
        </div>
        <div ref="container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-hidden duration-200">
            <GridItem v-for="emoji in emojis" :key="emoji.id" :emoji="emoji" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";
import Button from "~/packages/ui/components/buttons/button.vue";
import Icon from "~/packages/ui/components/icons/icon.vue";
import GridItem from "./grid-item.vue";

defineProps<{
    emojis: (Emoji & { id: string; global: boolean })[];
    name: string;
}>();

const collapsed = ref(false);
const container = ref<HTMLDivElement | null>(null);

watch(
    collapsed,
    (value) => {
        // Use requestAnimationFrame to prevent layout thrashing
        requestAnimationFrame(() => {
            if (!container.value) {
                return;
            }
            container.value.style.maxHeight = value
                ? "0px"
                : `${container.value.scrollHeight}px`;
        });
    },
    { immediate: true },
);
</script>