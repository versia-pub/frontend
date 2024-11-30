<template>
    <component :is="itemComponent" :note="item" @update="$emit('update', $event)"
        @delete="$emit('delete', item?.id)" />
</template>

<script lang="ts" setup>
import type { Notification, Status } from "@versia/client/types";
import { computed } from "vue";
import NewNoteItem from "../notes/note.vue";
import NoteItem from "../social-elements/notes/note.vue";
import NotificationItem from "../social-elements/notifications/notif.vue";

const props = defineProps<{
    item?: Status | Notification;
    type: "status" | "notification";
}>();

const itemComponent = computed(() => {
    if (props.type === "status") {
        return NewNoteItem;
    }
    if (props.type === "notification") {
        return NotificationItem;
    }
    return null;
});
</script>