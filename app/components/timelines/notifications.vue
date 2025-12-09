<template>
    <Timeline
        type="notification"
        :items="items"
        :is-loading="isLoading"
        :has-reached-end="hasReachedEnd"
        :error="error"
        :load-next="loadNext"
        :load-prev="loadPrev"
        :remove-item="removeItem"
        :update-item="updateItem"
    />
</template>

<script lang="ts" setup>
import { useNotificationTimeline } from "~/composables/NotificationTimeline";
import Timeline from "./timeline.vue";

const {
    error,
    hasReachedEnd,
    isLoading,
    items,
    loadNext,
    loadPrev,
    removeItem,
    updateItem,
} = useNotificationTimeline();
</script>
