<template>
    <TooltipProvider>
        <Card>
            <Tooltip>
                <TooltipTrigger :as-child="true">
                    <CardHeader v-if="notification.account" class="flex-row items-center gap-2 p-4">
                        <component :is="icon" class="size-5" />
                        <Avatar class="size-6 rounded-md border border-card">
                            <AvatarImage :src="notification.account.avatar" alt="" />
                            <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
                        </Avatar>
                        <span class="font-semibold">{{ notification.type === 'mention' ? text.toLowerCase() : notification.account.display_name }}</span>
                    </CardHeader>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{{ text }}</p>
                </TooltipContent>
            </Tooltip>
            <CardContent class="p-0">
                <Note v-if="notification.status" :note="notification.status" :small-layout="true" :hide-actions="true" />
            </CardContent>
        </Card>
    </TooltipProvider>
</template>

<script lang="ts" setup>
import type { Notification } from "@versia/client/types";
import {
    AtSign,
    Heart,
    Repeat,
    User,
    UserCheck,
    UserPlus,
} from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/ui/tooltip";
import Note from "../notes/note.vue";

const { notification } = defineProps<{
    notification: Notification;
}>();

const icon = computed(() => {
    switch (notification.type) {
        case "mention":
            return AtSign;
        case "reblog":
            return Repeat;
        case "follow":
            return UserPlus;
        case "favourite":
            return Heart;
        case "follow_request":
            return User;
        case "follow_accept":
            return UserCheck;
        default:
            return null;
    }
});

const text = computed(() => {
    switch (notification.type) {
        case "mention":
            return "Mentioned you";
        case "reblog":
            return "Reblogged your note";
        case "follow":
            return "Followed you";
        case "favourite":
            return "Liked your note";
        case "follow_request":
            return "Requested to follow you";
        case "follow_accept":
            return "Accepted your follow request";
        default:
            return "";
    }
});
</script>