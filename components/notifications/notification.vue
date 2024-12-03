<template>
    <Card>
        <Collapsible :default-open="true">
            <Tooltip>
                <TooltipTrigger :as-child="true">
                    <CardHeader v-if="notification.account"
                        class="flex-row items-center gap-2 px-4 py-2 border-b border-border">
                        <component :is="icon" class="size-5 shrink-0" />
                        <Avatar class="size-6 border border-card" :src="notification.account.avatar" :name="notification.account.display_name" />
                        <span class="font-semibold" v-render-emojis="notification.account.emojis">{{
                            notification.account.display_name
                        }}</span>
                        <CollapsibleTrigger :as-child="true">
                            <Button variant="ghost" size="icon" class="ml-auto [&_svg]:data-[state=open]:-rotate-180">
                                <ChevronDown class="duration-200" />
                            </Button>
                        </CollapsibleTrigger>
                    </CardHeader>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{{ text }}</p>
                </TooltipContent>
            </Tooltip>
            <CollapsibleContent :as-child="true">
                <CardContent class="p-0">
                    <Note v-if="notification.status" :note="notification.status" :small-layout="true"
                        :hide-actions="true" />
                    <FollowRequest v-else-if="notification.type === 'follow_request' && notification.account" :follower="notification.account" />
                </CardContent>
            </CollapsibleContent>
        </Collapsible>
    </Card>
</template>

<script lang="ts" setup>
import type { Notification } from "@versia/client/types";
import {
    AtSign,
    ChevronDown,
    Heart,
    Repeat,
    User,
    UserCheck,
    UserPlus,
} from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "~/components/ui/tooltip";
import Note from "../notes/note.vue";
import Avatar from "../profiles/avatar.vue";
import FollowRequest from "./follow-request.vue";

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
