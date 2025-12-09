<template>
    <div class="grid gap-1 bg-transparent p-2">
        <Button
            v-for="category in categories"
            :key="category.name"
            size="icon"
            variant="ghost"
            @click="() => emit('select', category)"
        >
            <component
                v-if="category.groupId"
                :is="emojiGroupIconMap[category.groupId]"
                class="size-6 text-primary"
            />
            <img
                v-else-if="category.src"
                :src="category.src"
                class="size-6 align-middle inline not-prose"
                role="presentation"
            >
        </Button>
    </div>
</template>

<script lang="ts" setup>
import {
    Box,
    CarFront,
    Flag,
    Leaf,
    Percent,
    Pizza,
    Smile,
    Volleyball,
} from "lucide-vue-next";
import type { FunctionalComponent } from "vue";
import { Button } from "~/components/ui/button";
import { EmojiGroupId } from "./emoji";

const { categories } = defineProps<{
    categories: {
        name: string;
        groupId?: EmojiGroupId;
        src?: string;
    }[];
}>();

const emit = defineEmits<{
    select: [category: { name: string; groupId?: EmojiGroupId; src?: string }];
}>();

const emojiGroupIconMap: Record<EmojiGroupId, FunctionalComponent> = {
    [EmojiGroupId.People]: Smile,
    [EmojiGroupId.Nature]: Leaf,
    [EmojiGroupId.Food]: Pizza,
    [EmojiGroupId.Activity]: Volleyball,
    [EmojiGroupId.Travel]: CarFront,
    [EmojiGroupId.Object]: Box,
    [EmojiGroupId.Symbol]: Percent,
    [EmojiGroupId.Flag]: Flag,
};
</script>
