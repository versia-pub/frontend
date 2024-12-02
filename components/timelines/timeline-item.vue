<template>
    <component :is="itemComponent" :note="type === 'status' ? item : undefined" :notification="type === 'notification' ? item : undefined" @update="$emit('update', $event)"
        @delete="$emit('delete', item?.id)" />
</template>

<script lang="ts" setup>
import type { Notification, Status } from "@versia/client/types";
import Note from "../notes/note.vue";
import NotificationItem from "../notifications/notification.vue";

const props = defineProps<{
    item?: Status | Notification;
    type: "status" | "notification";
}>();

const itemComponent = computed(() => {
    if (props.type === "status") {
        return Note;
    }
    if (props.type === "notification") {
        return NotificationItem;
    }
    return null;
});
</script>