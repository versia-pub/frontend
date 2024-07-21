<template>
    <Timeline type="status" :items="(items as Status[])" :is-loading="isLoading" :has-reached-end="hasReachedEnd"
        :error="error" :load-next="loadNext" :load-prev="loadPrev" :remove-item="removeItem"
        :update-item="updateItem" />
</template>

<script lang="ts" setup>
import type { Status } from "@lysand-org/client/types";
import Timeline from "./timeline.vue";

const props = defineProps<{
    id: string;
}>();

const {
    error,
    hasReachedEnd,
    isLoading,
    items,
    loadNext,
    loadPrev,
    removeItem,
    updateItem,
} = useAccountTimeline(client.value, props.id);

useListen("note:delete", ({ id }) => {
    removeItem(id);
});

useListen("note:edit", (updatedNote) => {
    updateItem(updatedNote);
});

useListen("composer:send", (ee) => {
    loadPrev();
});
</script>