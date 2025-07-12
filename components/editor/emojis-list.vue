<template>
    <Command class="rounded border shadow-md min-w-[200px] h-fit not-prose" :selected-value="emojis[selectedIndex]?.id">
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup class="emojis-group" heading="Emojis">
                <CommandItem :value="emoji.id" v-for="emoji, index in emojis" :key="emoji.id" @click="selectItem(index)" class="scroll-m-10">
                    <img class="h-[1lh] align-middle inline hover:scale-110 transition-transform duration-75 ease-in-out" :src="emoji.url" :title="emoji.shortcode" />
                    <span>{{ emoji.shortcode }}</span>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </Command>
</template>

<script setup lang="ts">
import type {} from "@tiptap/extension-emoji";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "~/components/ui/command";

const { items, command } = defineProps<{
    items: string[];
    command: (value: { name: string }) => void;
}>();

const selectedIndex = ref(0);
const emojis = computed(() => {
    return items
        .map((item) => {
            return identity.value?.emojis.find(
                (emoji) => emoji.shortcode === item,
            );
        })
        .filter((emoji) => emoji !== undefined);
});

const onKeyDown = ({ event }: { event: Event }) => {
    if (event instanceof KeyboardEvent) {
        if (event.key === "ArrowDown") {
            selectedIndex.value =
                (selectedIndex.value + 1) % emojis.value.length;
            scrollIntoView(selectedIndex.value);

            return true;
        }
        if (event.key === "ArrowUp") {
            selectedIndex.value =
                (selectedIndex.value - 1 + emojis.value.length) %
                emojis.value.length;
            scrollIntoView(selectedIndex.value);

            return true;
        }
        if (event.key === "Enter") {
            selectItem(selectedIndex.value);
            return true;
        }
    }
};

const selectItem = (index: number) => {
    const item = emojis.value[index];

    if (item) {
        command({
            name: item.shortcode,
        });
    }
};

const scrollIntoView = (index: number) => {
    const usersGroup = document.getElementsByClassName("mentions-group")[0];
    const item = usersGroup?.children[index];

    if (item) {
        item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }
};

defineExpose({ onKeyDown });
</script>
