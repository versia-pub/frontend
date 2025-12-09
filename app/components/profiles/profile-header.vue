<template>
    <CardHeader class="relative w-full">
        <div class="bg-muted rounded overflow-hidden h-48 md:h-72 w-full">
            <img
                v-if="header"
                :src="header"
                alt=""
                class="object-cover w-full h-full"
            >
            <!-- Shadow overlay at the bottom -->
            <div
                class="absolute bottom-0 w-full h-1/3 bg-gradient-to-b from-black/0 to-black/40"
            ></div>
        </div>
        <div
            class="absolute bottom-0 translate-y-1/3 left-4 flex flex-row items-start gap-2"
        >
            <Avatar class="size-32 border" :src="avatar" :name="displayName"/>
        </div>
    </CardHeader>
</template>

<script lang="ts" setup>
import { CardHeader } from "~/components/ui/card";
import Avatar from "./avatar.vue";

defineProps<{
    header: string;
    avatar: string;
    displayName: string;
}>();
</script>
