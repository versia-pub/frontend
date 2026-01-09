<template>
    <div>
        <Note
            v-if="parent"
            :note="parent"
            :hide-actions="true"
            :reply-bar="true"
            class="rounded-b-none"
        />
        <Note :note="note" :class="parent && 'border-t-0 rounded-t-none'" />
    </div>
</template>

<script lang="ts" setup>
import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import Note from "./note.vue";

const { note } = defineProps<{
    note: z.infer<typeof Status>;
}>();

const parent = useNote(note.in_reply_to_id);
</script>
