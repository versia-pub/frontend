<template>
    <Avatar :shape="(shape.value as 'circle' | 'square')">
        <AvatarFallback v-if="name">
            {{ getInitials(name) }}
        </AvatarFallback>
        <AvatarImage v-if="src" :src="src" :alt="`${name}'s avatar`" />
    </Avatar>
</template>

<script lang="ts" setup>
import { SettingIds } from "~/settings";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const { name } = defineProps<{
    src?: string;
    name?: string;
}>();

/**
 * Gets the initials of any string, even if it's not a name.
 * If not a name, it will return the first two characters.
 * @param name
 */
const getInitials = (name: string): string => {
    const initials = name.match(/\b\w/g) || [];

    const firstLetter = initials.shift() || name[0] || "";
    const secondLetter = initials.pop() || name[1] || "";

    return `${firstLetter}${secondLetter}`.toUpperCase();
};

const shape = useSetting(SettingIds.AvatarShape);
</script>
