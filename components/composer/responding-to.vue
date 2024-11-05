<template>
    <div v-if="respondingTo" class="mb-4" role="region" aria-label="Responding to">
        <OverlayScrollbarsComponent :defer="true" class="max-h-72 overflow-y-auto">
            <Note :element="respondingTo" :small="true" :disabled="true" class="!rounded-none !bg-primary-500/10" />
        </OverlayScrollbarsComponent>
    </div>
</template>

<script lang="ts" setup>
import type { Status } from "@versia/client/types";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import Note from "../social-elements/notes/note.vue";

const props = defineProps<{
    respondingTo: Status;
}>();
</script>