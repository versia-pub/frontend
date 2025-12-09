<template>
    <Command
        class="rounded border shadow-md min-w-[200px] h-fit not-prose"
        :selected-value="items[selectedIndex]?.key"
    >
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup class="mentions-group" heading="Users">
                <CommandItem
                    :value="user.key"
                    v-for="user, index in items"
                    :key="user.key"
                    @click="selectItem(index)"
                    class="scroll-m-10"
                >
                    <Avatar
                        class="size-4"
                        :src="user.value.avatar"
                        :name="user.value.display_name"
                    />
                    <span v-render-emojis="user.value.emojis"
                        >{{ user.value.display_name }}</span
                    >
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </Command>
</template>

<script setup lang="ts">
import type { MentionNodeAttrs } from "@tiptap/extension-mention";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "~/components/ui/command";
import Avatar from "../profiles/avatar.vue";
import type { UserData } from "./suggestion";

const { items, command } = defineProps<{
    items: UserData[];
    command: (value: MentionNodeAttrs) => void;
}>();

const selectedIndex = ref(0);

const onKeyDown = ({ event }: { event: Event }) => {
    if (event instanceof KeyboardEvent) {
        if (event.key === "ArrowDown") {
            selectedIndex.value = (selectedIndex.value + 1) % items.length;
            scrollIntoView(selectedIndex.value);

            return true;
        }
        if (event.key === "ArrowUp") {
            selectedIndex.value =
                (selectedIndex.value - 1 + items.length) % items.length;
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
    const item = items[index];

    if (item) {
        command({
            id: item.key,
            label: item.value.acct,
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
