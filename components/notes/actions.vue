<template>
    <div class="flex flex-row w-full items-stretch justify-around text-sm *:max-w-28 *:w-full *:text-muted-foreground">
        <Button variant="ghost" @click="emit('reply')">
            <Reply class="size-5 text-primary" />
            {{ numberFormat(replyCount) }}
        </Button>
        <Button variant="ghost" @click="liked ? unlike() : like()">
            <Heart class="size-5 text-primary" />
            {{ numberFormat(likeCount) }}
        </Button>
        <Button variant="ghost" @click="reblogged ? unreblog() : reblog()">
            <Repeat class="size-5 text-primary" />
            {{ numberFormat(reblogCount) }}
        </Button>
        <Button variant="ghost" @click="emit('quote')">
            <Quote class="size-5 text-primary" />
        </Button>
        <Menu :api-note-string="apiNoteString" :url="url" :remote-url="remoteUrl" :is-remote="isRemote" :author-id="authorId" @edit="emit('edit')" :note-id="noteId" @delete="emit('delete')">
            <Button variant="ghost">
                <Ellipsis class="size-5 text-primary" />
            </Button>
        </Menu>
    </div>
</template>

<script lang="ts" setup>
import { Ellipsis, Heart, Quote, Repeat, Reply } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";
import Menu from "./menu.vue";

const { noteId } = defineProps<{
    replyCount: number;
    likeCount: number;
    reblogCount: number;
    apiNoteString: string;
    noteId: string;
    isRemote: boolean;
    url: string;
    remoteUrl: string;
    authorId: string;
    liked: boolean;
    reblogged: boolean;
}>();

const emit = defineEmits<{
    edit: [];
    reply: [];
    quote: [];
    delete: [];
}>();

const like = async () => {
    const id = toast.loading("Liking status...");
    const { data } = await client.value.favouriteStatus(noteId);
    toast.dismiss(id);
    toast.success("Status liked");
    useEvent("note:edit", data);
};

const unlike = async () => {
    const id = toast.loading("Unliking status...");
    const { data } = await client.value.unfavouriteStatus(noteId);
    toast.dismiss(id);
    toast.success("Status unliked");
    useEvent("note:edit", data);
};

const reblog = async () => {
    const id = toast.loading("Reblogging status...");
    const { data } = await client.value.reblogStatus(noteId);
    toast.dismiss(id);
    toast.success("Status reblogged");
    useEvent("note:edit", data.reblog || data);
};

const unreblog = async () => {
    const id = toast.loading("Unreblogging status...");
    const { data } = await client.value.unreblogStatus(noteId);
    toast.dismiss(id);
    toast.success("Status unreblogged");
    useEvent("note:edit", data);
};

const numberFormat = (number = 0) =>
    number !== 0
        ? new Intl.NumberFormat(undefined, {
              notation: "compact",
              compactDisplay: "short",
              maximumFractionDigits: 1,
          }).format(number)
        : undefined;
</script>