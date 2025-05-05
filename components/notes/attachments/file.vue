<template>
    <Base :attachment="attachment" lightbox>
        <div class="flex flex-col items-center justify-center min-h-48 text-sm gap-2">
            <File class="size-12" />
            <span>File attachment</span>
        </div>
    </Base>
</template>

<script lang="ts" setup>
import type { Attachment } from "@versia/client/types";
import { File } from "lucide-vue-next";
import Base from "./base.vue";

const { attachment } = defineProps<{
    attachment: Attachment;
}>();
</script>
