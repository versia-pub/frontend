<template>
    <Card class="w-full h-full overflow-hidden">
        <img v-if="attachment.type === 'image'" :src="attachment.url" :alt="attachment.description ?? ''" class="w-full h-full object-contain bg-muted/20" />
        <video v-else-if="attachment.type === 'video' || attachment.type === 'gifv'" :src="attachment.url" :alt="attachment.description ?? ''" class="w-full h-full object-cover bg-muted/20" controls />
        <audio v-else-if="attachment.type === 'audio'" :src="attachment.url" :alt="attachment.description ?? ''" class="w-full h-full object-cover bg-muted/20" controls />
        <div v-else class="w-full h-full flex flex-col items-center justify-center bg-muted/20">
            <File class="size-12" />
            <span class="text-sm"></span>
        </div>
    </Card>
</template>

<script lang="ts" setup>
import type { Attachment } from "@versia/client/types";
import { File } from "lucide-vue-next";
import { Card } from "~/components/ui/card";

defineProps<{
    attachment: Attachment;
}>();
</script>