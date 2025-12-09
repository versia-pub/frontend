<template>
    <Timeline
        type="status"
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
import { usePublicTimeline } from "~/composables/PublicTimeline";
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
} = usePublicTimeline();

useListen("note:delete", ({ id }) => {
    removeItem(id);
});

useListen("note:edit", (updatedNote) => {
    updateItem(updatedNote);
});

useListen("composer:send", () => {
    loadPrev();
});
</script>
