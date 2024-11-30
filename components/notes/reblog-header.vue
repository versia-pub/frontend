<template>
    <div class="rounded border hover:bg-muted duration-100 text-sm flex flex-row items-center gap-2 px-2 py-1 mb-2">
        <Repeat class="size-4 text-primary" />
        <Avatar class="size-6 rounded border">
            <AvatarImage :src="avatar" alt="" />
            <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
        </Avatar>
        <span class="font-semibold">{{ displayName }}</span>
        reblogged
    </div>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Repeat } from "lucide-vue-next";

defineProps<{
    avatar: string;
    displayName: string;
}>();
</script>