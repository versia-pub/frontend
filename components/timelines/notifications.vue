<template>
    <Timeline type="notification" :items="(items as Notification[])" :is-loading="isLoading"
        :has-reached-end="hasReachedEnd" :error="error" :load-next="loadNext" :load-prev="loadPrev"
        :remove-item="removeItem" :update-item="updateItem" />
</template>

<script lang="ts" setup>
import type { Notification } from "@lysand-org/client/types";
import { useNotificationTimeline } from "~/composables/NotificationTimeline";
import Timeline from "./timeline.vue";

const client = useClient();

const {
    error,
    hasReachedEnd,
    isLoading,
    items,
    loadNext,
    loadPrev,
    removeItem,
    updateItem,
} = useNotificationTimeline(client.value);
</script>