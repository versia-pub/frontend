<template>
    <div class="flex flex-col p-1 bg-dark-400">
        <div class="px-4 pt-2 pb-3 flex flex-row gap-2 items-center">
            <Skeleton :enabled="!notification" shape="rect" class="!h-6" :min-width="40" :max-width="100"
                width-unit="%">
                <Icon :name="icon" class="h-6 w-6 text-gray-200" aria-hidden="true" />
                <img v-if="notification?.account?.avatar" :src="notification?.account.avatar"
                    :alt="`${notification?.account.acct}'s avatar'`"
                    class="h-6 w-6 shrink-0 rounded ring-1 ring-white/10" />
                <span class="text-gray-200"><strong v-html="accountName"></strong> {{ text
                    }}</span>
            </Skeleton>
        </div>
        <div>
            <LazySocialElementsNotesNote v-if="notification?.status || !notification" :note="notification?.status"
                :small="true" />
            <div v-else-if="notification.account" class="p-6 ring-1 ring-white/5 bg-dark-800">
                <SocialElementsUsersSmallCard :account="notification.account" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Notification } from "~/types/mastodon/notification";

const props = defineProps<{
    notification?: Notification;
}>();

const accountName = useParsedContent(
    props.notification?.account?.display_name ?? "",
    props.notification?.account?.emojis ?? [],
);
const text = computed(() => {
    if (!props.notification) return "";

    switch (props.notification.type) {
        case "mention":
            return "mentioned you";
        case "reblog":
            return "reblogged your note";
        case "favourite":
            return "liked your note";
        case "follow":
            return "followed you";
        case "follow_request":
            return "requested to follow you";
        default:
            console.error("Unknown notification type", props.notification.type);
            return "";
    }
});
const icon = computed(() => {
    if (!props.notification) return "";

    switch (props.notification.type) {
        case "mention":
            return "tabler:at";
        case "reblog":
            return "tabler:repeat";
        case "favourite":
            return "tabler:heart";
        case "follow":
            return "tabler:plus";
        case "follow_request":
            return "tabler:plus";
        default:
            return "";
    }
});
</script>