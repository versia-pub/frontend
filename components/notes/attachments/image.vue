<template>
    <Base :attachment="attachment" lightbox>
        <img :src="attachment.url" :alt="attachment.description ?? undefined" />
    </Base>
</template>

<script lang="ts" setup>
import type { Attachment } from "@versia/client/types";
import Base from "./base.vue";

const { attachment } = defineProps<{
    attachment: Attachment;
}>();
</script>
