<template>
    <CardHeader class="p-0 relative">
        <div class="bg-muted rounded overflow-hidden h-48 md:h-72 w-full">
            <img :src="header" alt="" class="object-cover w-full h-full" />
            <!-- Shadow overlay at the bottom -->
            <div class="absolute bottom-0 w-full h-1/3 bg-gradient-to-b from-black/0 to-black/40"></div>
        </div>
        <div class="absolute bottom-0 translate-y-1/3 left-4 flex flex-row items-start gap-2">
            <Avatar shape="square" size="lg" class="border">
                <AvatarImage :src="avatar" alt="" />
                <AvatarFallback>AA</AvatarFallback>
            </Avatar>
        </div>
    </CardHeader>
</template>

<script lang="ts" setup>
import { CardHeader } from "~/components/ui/card";

defineProps<{
    header: string;
    avatar: string;
}>();
</script>