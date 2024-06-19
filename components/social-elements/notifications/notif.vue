<template>
    <div class="flex flex-col p-1 bg-dark-400">
        <div class="px-4 pt-2 pb-3 flex flex-row gap-2 items-center">
            <Skeleton :enabled="!notification" shape="rect" class="!h-6" :min-width="40" :max-width="100"
                width-unit="%">
                <iconify-icon :icon="icon" width="1.5rem" height="1.5rem" class="text-gray-200" aria-hidden="true" />
                <AvatarsCentered v-if="notification?.account?.avatar" :src="notification?.account.avatar"
                    :alt="`${notification?.account.acct}'s avatar'`"
                    class="h-6 w-6 shrink-0 rounded ring-1 ring-white/10" />
                <span class="text-gray-200 line-clamp-1"><strong v-html="display_name"></strong> {{ text
                    }}</span>
            </Skeleton>
        </div>
        <div>
            <LazySocialElementsNotesNote v-if="notification?.status || !notification" :note="notification?.status"
                :small="true" />
            <div v-else-if="notification.account" class="p-6 ring-1 ring-white/5 bg-dark-800">
                <SocialElementsUsersSmallCard :account="notification.account" />
            </div>
            <div v-if="notification?.type === 'follow_request' && relationship?.requested_by"
                class="w-full grid grid-cols-2 gap-4 p-2 ">
                <ButtonsPrimary :loading="isWorkingOnFollowRequest" @click="acceptFollowRequest"><span>Accept</span>
                </ButtonsPrimary>
                <ButtonsSecondary :loading="isWorkingOnFollowRequest" @click="rejectFollowRequest"><span>Reject</span>
                </ButtonsSecondary>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Notification, Relationship } from "@lysand-org/client/types";

const props = defineProps<{
    notification?: Notification;
}>();

const client = useClient();
const isWorkingOnFollowRequest = ref(false);
const { relationship } = useRelationship(
    client,
    props.notification?.account?.id ?? null,
);

const acceptFollowRequest = async () => {
    if (!props.notification?.account) return;
    isWorkingOnFollowRequest.value = true;
    const { data } = await client.value.acceptFollowRequest(
        props.notification.account.id,
    );
    relationship.value = data;
    isWorkingOnFollowRequest.value = false;
};

const rejectFollowRequest = async () => {
    if (!props.notification?.account) return;
    isWorkingOnFollowRequest.value = true;
    const { data } = await client.value.rejectFollowRequest(
        props.notification.account.id,
    );
    relationship.value = data;
    isWorkingOnFollowRequest.value = false;
};

const settings = useSettings();
const { display_name } = useParsedAccount(
    props.notification?.account,
    settings,
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