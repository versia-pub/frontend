<template>
    <div class="flex flex-col p-1 bg-dark-400">
        <div class="px-4 pt-2 pb-3 flex flex-row gap-2 items-center">
            <Skeleton :enabled="!element" shape="rect" class="!h-6" :min-width="40" :max-width="100" width-unit="%">
                <iconify-icon :icon="icon" width="1.5rem" height="1.5rem" class="text-gray-200" aria-hidden="true" />
                <Avatar v-if="element?.account?.avatar" :src="element?.account.avatar"
                    :alt="`${element?.account.acct}'s avatar'`" class="h-6 w-6 shrink-0 rounded ring-1 ring-white/10" />
                <span class="text-gray-200 line-clamp-1"><strong v-html="display_name"></strong> {{ text
                    }}</span>
            </Skeleton>
        </div>
        <div>
            <Note v-if="element?.status || !element" :element="element?.status" :small="true" />
            <div v-else-if="element.account" class="p-6 ring-1 ring-white/5 bg-dark-800">
                <SmallCard :account="element.account" />
            </div>
            <div v-if="element?.type === 'follow_request' && relationship?.requested_by"
                class="w-full grid grid-cols-2 gap-4 p-2 ">
                <Button theme="primary" :loading="isWorkingOnFollowRequest"
                    @click="acceptFollowRequest"><span>Accept</span>
                </Button>
                <Button theme="secondary" :loading="isWorkingOnFollowRequest"
                    @click="rejectFollowRequest"><span>Reject</span>
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Notification } from "@versia/client/types";
import Avatar from "~/components/avatars/avatar.vue";
import Skeleton from "~/components/skeleton/Skeleton.vue";
import Button from "~/packages/ui/components/buttons/button.vue";
import Note from "../notes/note.vue";
import SmallCard from "../users/SmallCard.vue";

const props = defineProps<{
    element?: Notification;
}>();

const isWorkingOnFollowRequest = ref(false);
const { relationship } = useRelationship(
    client,
    props.element?.account?.id ?? null,
);

const acceptFollowRequest = async () => {
    if (!props.element?.account) {
        return;
    }
    isWorkingOnFollowRequest.value = true;
    const { data } = await client.value.acceptFollowRequest(
        props.element.account.id,
    );
    relationship.value = data;
    isWorkingOnFollowRequest.value = false;
};

const rejectFollowRequest = async () => {
    if (!props.element?.account) {
        return;
    }
    isWorkingOnFollowRequest.value = true;
    const { data } = await client.value.rejectFollowRequest(
        props.element.account.id,
    );
    relationship.value = data;
    isWorkingOnFollowRequest.value = false;
};

const { display_name } = useParsedAccount(props.element?.account, settings);

const text = computed(() => {
    if (!props.element) {
        return "";
    }

    switch (props.element.type) {
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
        default: {
            console.error("Unknown notification type", props.element.type);
            return "";
        }
    }
});
const icon = computed(() => {
    if (!props.element) {
        return "";
    }

    switch (props.element.type) {
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