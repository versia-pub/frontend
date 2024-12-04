<template>
    <Card class="grid grid-cols-[auto,1fr] gap-4 items-center p-4">
        <Avatar shape="square">
            <AvatarImage :src="emoji.url" />
        </Avatar>
        <CardHeader class="p-0 gap-0 overflow-hidden">
            <CardTitle as="span" class="text-sm font-mono truncate">
                {{ emoji.shortcode }}
            </CardTitle>
            <CardDescription>
                {{ emoji.global ? "Global" : "Uploaded by you" }}
            </CardDescription>
        </CardHeader>
    </Card>
</template>

<script lang="ts" setup>
import type { Emoji } from "@versia/client/types";
import { Avatar } from "~/components/ui/avatar";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";

defineProps<{
    emoji: Emoji;
}>();
</script>