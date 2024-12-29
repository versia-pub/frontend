<template>
    <div>
        <Note v-if="parent" :note="parent" :hide-actions="true" :content-under-username="true" :bottom-avatar-bar="true" />
        <Note :note="note" :top-avatar-bar="!!parent" />
    </div>
</template>

<script lang="ts" setup>
import type { Status } from "@versia/client/types";
import Note from "./note.vue";

const { note } = defineProps<{
    note: Status;
}>();

const parent = useNote(client, note.in_reply_to_id);
</script>
