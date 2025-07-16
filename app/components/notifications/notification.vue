<template>
    <Card class="*:w-full p-2">
        <Collapsible :default-open="true" v-slot="{ open }" class="space-y-1">
            <Tooltip>
                <TooltipTrigger :as-child="true">
                    <CardHeader
                        v-if="notification.account"
                        class="flex flex-row items-center gap-2 px-2"
                    >
                        <component :is="icon" class="size-5 shrink-0" />
                        <Avatar
                            class="size-5 border border-card"
                            :src="notification.account.avatar"
                            :name="notification.account.display_name"
                        />
                        <span
                            class="font-semibold text-sm"
                            v-render-emojis="notification.account.emojis"
                            >{{ notification.account.display_name }}</span
                        >
                        <CollapsibleTrigger :as-child="true">
                            <Button
                                variant="ghost"
                                size="icon"
                                class="ml-auto [&_svg]:data-[state=open]:-rotate-180"
                                :title="open ? 'Collapse' : 'Expand'"
                            >
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
                    <Note
                        v-if="notification.status"
                        :note="notification.status"
                        :small-layout="true"
                        :hide-actions="true"
                    />
                    <FollowRequest
                        v-else-if="
                            notification.type === 'follow_request' &&
                            notification.account
                        "
                        :follower="notification.account"
                    />
                </CardContent>
            </CollapsibleContent>
        </Collapsible>
    </Card>
</template>

<script lang="ts" setup>
import type { Notification } from "@versia/client/schemas";
import {
    AtSign,
    ChevronDown,
    Heart,
    Repeat,
    User,
    UserPlus,
} from "lucide-vue-next";
import type { z } from "zod";
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
import * as m from "~~/paraglide/messages.js";
import Note from "../notes/note.vue";
import Avatar from "../profiles/avatar.vue";
import FollowRequest from "./follow-request.vue";

const { notification } = defineProps<{
    notification: z.infer<typeof Notification>;
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
        // case "follow_accept":
        //    return UserCheck;
        default:
            return null;
    }
});

const text = computed(() => {
    switch (notification.type) {
        case "mention":
            return m.fuzzy_orange_tuna_succeed();
        case "reblog":
            return m.grand_proof_quail_read();
        case "follow":
            return m.top_steep_scallop_care();
        case "favourite":
            return m.swift_just_beetle_devour();
        case "follow_request":
            return m.seemly_short_thrush_bloom();
        //case "follow_accept":
        //    return m.weird_seemly_termite_scold();
        default:
            return "";
    }
});
</script>
