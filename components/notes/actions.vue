<template>
    <div class="flex flex-row w-full items-stretch justify-around text-sm *:max-w-28 *:w-full *:text-muted-foreground">
        <Button variant="ghost" @click="emit('reply')">
            <Reply class="size-5 text-primary" />
            {{ numberFormat(replyCount) }}
        </Button>
        <Button variant="ghost">
            <Heart class="size-5 text-primary" />
            {{ numberFormat(likeCount) }}
        </Button>
        <Button variant="ghost">
            <Repeat class="size-5 text-primary" />
            {{ numberFormat(reblogCount) }}
        </Button>
        <Button variant="ghost" @click="emit('quote')">
            <Quote class="size-5 text-primary" />
        </Button>
        <Menu :api-note-string="apiNoteString" :url="url" :remote-url="remoteUrl" :is-remote="isRemote" :author-id="authorId" @edit="emit('edit')">
            <Button variant="ghost">
                <Ellipsis class="size-5 text-primary" />
            </Button>
        </Menu>
    </div>
</template>

<script lang="ts" setup>
import { Ellipsis, Heart, Quote, Repeat, Reply } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import Menu from "./menu.vue";

defineProps<{
    replyCount: number;
    likeCount: number;
    reblogCount: number;
    apiNoteString: string;
    isRemote: boolean;
    url: string;
    remoteUrl: string;
    authorId: string;
}>();

const emit = defineEmits<{
    edit: [];
    reply: [];
    quote: [];
}>();

const numberFormat = (number = 0) =>
    number !== 0
        ? new Intl.NumberFormat(undefined, {
              notation: "compact",
              compactDisplay: "short",
              maximumFractionDigits: 1,
          }).format(number)
        : undefined;
</script>