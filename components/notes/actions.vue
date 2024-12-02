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
import { SettingIds } from "~/settings";
import { confirmModalService } from "../modals/composable";
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

const confirmLikes = useSetting(SettingIds.ConfirmLike);
const confirmReblogs = useSetting(SettingIds.ConfirmReblog);

const like = async () => {
    if (confirmLikes.value.value) {
        const confirmation = await confirmModalService.confirm({
            title: "Like status",
            message: "Are you sure you want to like this status?",
            confirmText: "Like",
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading("Liking status...");
    const { data } = await client.value.favouriteStatus(noteId);
    toast.dismiss(id);
    toast.success("Status liked");
    useEvent("note:edit", data);
};

const unlike = async () => {
    if (confirmLikes.value.value) {
        const confirmation = await confirmModalService.confirm({
            title: "Unlike status",
            message: "Are you sure you want to unlike this status?",
            confirmText: "Unlike",
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading("Unliking status...");
    const { data } = await client.value.unfavouriteStatus(noteId);
    toast.dismiss(id);
    toast.success("Status unliked");
    useEvent("note:edit", data);
};

const reblog = async () => {
    if (confirmReblogs.value.value) {
        const confirmation = await confirmModalService.confirm({
            title: "Reblog status",
            message: "Are you sure you want to reblog this status?",
            confirmText: "Reblog",
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading("Reblogging status...");
    const { data } = await client.value.reblogStatus(noteId);
    toast.dismiss(id);
    toast.success("Status reblogged");
    useEvent("note:edit", data.reblog || data);
};

const unreblog = async () => {
    if (confirmReblogs.value.value) {
        const confirmation = await confirmModalService.confirm({
            title: "Unreblog status",
            message: "Are you sure you want to unreblog this status?",
            confirmText: "Unreblog",
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

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