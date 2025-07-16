<template>
    <Base :attachment="attachment">
        <video :src="attachment.url" :alt="attachment.description ?? undefined" controls />
    </Base>
</template>

<script lang="ts" setup>
import type { Attachment } from "@versia/client/schemas";
import type { z } from "zod";
import Base from "./base.vue";

const { attachment } = defineProps<{
    attachment: z.infer<typeof Attachment>;
}>();
</script>
