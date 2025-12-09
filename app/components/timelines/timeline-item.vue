<template>
    <component
        :is="itemComponent"
        :note="type === 'status' ? item : undefined"
        :notification="type === 'notification' ? item : (undefined as any)"
        @update="$emit('update', $event)"
        @delete="$emit('delete', item?.id)"
    />
</template>

<script lang="ts" setup>
import type { Notification, Status } from "@versia/client/schemas";
import type { z } from "zod";
import Thread from "../notes/thread.vue";
import NotificationItem from "../notifications/notification.vue";

const props = defineProps<{
    item?: z.infer<typeof Status> | z.infer<typeof Notification>;
    type: "status" | "notification";
}>();

const itemComponent = computed(() => {
    if (props.type === "status") {
        return Thread;
    }

    if (props.type === "notification") {
        return NotificationItem;
    }

    return null;
});
</script>
