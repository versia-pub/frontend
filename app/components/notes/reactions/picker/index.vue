<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <slot/>
        </PopoverTrigger>
        <PopoverContent class="p-0 w-fit">
            <div
                class="grid-cols-[minmax(0,1fr)_auto] gap-0 grid divide-x *:h-112 *:overflow-y-auto"
                orientation="vertical"
            >
                <div
                    class="grid grid-rows-[auto_minmax(0,1fr)_auto] gap-0"
                    ref="emojiContainer"
                >
                    <div class="p-2">
                        <Input placeholder="Search" v-model="filter"/>
                    </div>
                    <VList
                        :data="virtualizedItems"
                        #default="{ item }"
                        class="relative"
                        :style="{
                        width: `calc(var(--spacing) * ((12 * ${EMOJI_PER_ROW}) + (${EMOJI_PER_ROW} - 1)) + var(--spacing) * 4)`,
                    }"
                    >
                        <CategoryHeader
                            :key="item.headerId"
                            v-if="item.type === 'header'"
                            :category-name="item.name"
                        />
                        <div
                            v-else-if="item.type === 'emoji-row'"
                            :key="item.rowId"
                            class="flex gap-1 p-2"
                        >
                            <Emoji
                                v-for="emoji in item.emojis"
                                :key="getEmojiKey(emoji)"
                                :emoji="emoji"
                                @select="(e) => selectedEmoji = e"
                                @pick="e => {
                                    emit('pick', e); open = false;
                                }"
                            />
                        </div>
                    </VList>
                    <EmojiDisplay
                        :emoji="selectedEmoji"
                        :style="{
                        width: `calc(var(--spacing) * ((12 * ${EMOJI_PER_ROW}) + (${EMOJI_PER_ROW} - 1)) + var(--spacing) * 4)`,
                    }"
                    />
                </div>
                <Sidebar :categories="categories" @select="scrollToCategory"/>
            </div>
        </PopoverContent>
    </Popover>
</template>

<script lang="ts" setup>
import type { CustomEmoji } from "@versia/client/schemas";
import { VList } from "virtua/vue";
import type { z } from "zod";
import { Input } from "~/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import CategoryHeader from "./category-header.vue";
import EmojiDisplay from "./display.vue";
import { type EmojiGroupId, emojiGroups, type UnicodeEmoji } from "./emoji.ts";
import Emoji from "./emoji.vue";
import Sidebar from "./sidebar.vue";
import { EMOJI_PER_ROW, getVirtualizedItems } from "./virtual.ts";

const emit = defineEmits<{
    pick: [emoji: z.infer<typeof CustomEmoji> | UnicodeEmoji];
}>();

const authStore = useAuthStore();
const open = ref(false);
const selectedEmoji = ref<z.infer<typeof CustomEmoji> | UnicodeEmoji | null>(
    null,
);
const emojiContainer = useTemplateRef<HTMLDivElement>("emojiContainer");
const filter = ref("");

const customEmojiCategories = computed(() => {
    const categories: Record<string, z.infer<typeof CustomEmoji>[]> = {};

    for (const emoji of authStore.emojis) {
        const categoryName = emoji.category || "Uncategorized";

        if (!categories[categoryName]) {
            categories[categoryName] = [];
        }

        categories[categoryName]?.push(emoji);
    }

    return categories;
});

const categories = computed(() => {
    const customCategories = Object.entries(customEmojiCategories.value).map(
        ([name, emojis]) => ({
            name,
            src: (emojis[0]?.url as string) || "",
        }),
    );

    const groupCategories = emojiGroups.map((group) => ({
        name: group.id,
        groupId: group.id,
    }));

    return [...customCategories, ...groupCategories];
});

const virtualizedItems = computed(() =>
    getVirtualizedItems(customEmojiCategories.value, filter.value),
);

const getEmojiKey = (emoji: z.infer<typeof CustomEmoji> | UnicodeEmoji) => {
    if ("url" in emoji) {
        return `custom-${emoji.shortcode}`;
    }
    return `unicode-${emoji.shortcode}`;
};

const scrollToCategory = (category: {
    name: string;
    groupId?: EmojiGroupId;
    src?: string;
}) => {
    const categoryId = category.groupId || `custom-${category.name}`;
    const headerIndex = virtualizedItems.value.findIndex(
        (item) => item.type === "header" && item.categoryId === categoryId,
    );

    const child = emojiContainer.value?.children[1];

    if (headerIndex !== -1 && child) {
        // Estimate scroll position based on item heights
        // Headers are approximately 38px, emoji rows are approximately 64px
        let scrollTop = 0;
        for (let i = 0; i < headerIndex; i++) {
            const item = virtualizedItems.value[i];
            if (item?.type === "header") {
                scrollTop += 38;
            } else if (item?.type === "emoji-row") {
                scrollTop += 64;
            }
        }

        child.scrollTo({
            top: scrollTop,
            behavior: "smooth",
        });
    }
};
</script>
