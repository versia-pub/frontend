<script setup lang="tsx">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Ban,
    Code,
    Delete,
    ExternalLink,
    Link,
    MessageSquare,
    Pencil,
    Trash,
} from "lucide-vue-next";
import { toast } from "vue-sonner";
import { confirmModalService } from "~/components/modals/composable.ts";

const { authorId, noteId } = defineProps<{
    apiNoteString: string;
    isRemote: boolean;
    url: string;
    remoteUrl: string;
    authorId: string;
    noteId: string;
}>();

const emit = defineEmits<{
    edit: [];
    delete: [];
}>();

const { copy } = useClipboard();
const loggedIn = !!identity.value;
const authorIsMe = loggedIn && authorId === identity.value?.account.id;

const copyText = (text: string) => {
    copy(text);
    toast.success("Copied to clipboard");
};

const blockUser = async (userId: string) => {
    const id = toast.loading("Blocking user...");
    await client.value.blockAccount(userId);
    toast.dismiss(id);

    toast.success("User blocked");
};

const _delete = async () => {
    const confirmation = await confirmModalService.confirm({
        title: "Delete status",
        message: "Are you sure you want to delete this status?",
        confirmText: "Delete",
        inputType: "none",
    });

    if (!confirmation.confirmed) {
        return;
    }

    const id = toast.loading("Deleting status...");
    await client.value.deleteStatus(noteId);
    toast.dismiss(id);

    toast.success("Status deleted");
    emit("delete");
};
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <slot />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Note Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem v-if="authorIsMe" as="button" @click="emit('edit')">
                    <Pencil class="mr-2 size-4" />
                    <span>Edit</span>
                    <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(apiNoteString)">
                    <Code class="mr-2 size-4" />
                    <span>Copy API data</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(url)">
                    <Link class="mr-2 size-4" />
                    <span>Copy link</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" v-if="isRemote" @click="copyText(remoteUrl)">
                    <Link class="mr-2 size-4" />
                    <span>Copy link (origin)</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem as="a" v-if="isRemote" target="_blank" rel="noopener noreferrer" :href="remoteUrl">
                    <ExternalLink class="mr-2 size-4" />
                    <span>Open on remote</span>
                    <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="authorIsMe" />
            <DropdownMenuGroup v-if="authorIsMe">
                <DropdownMenuItem as="button" :disabled="true">
                    <Delete class="mr-2 size-4" />
                    <span>Delete and redraft</span>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="_delete">
                    <Trash class="mr-2 size-4" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="loggedIn && !authorIsMe" />
            <DropdownMenuGroup v-if="loggedIn && !authorIsMe">
                <DropdownMenuItem as="button" :disabled="true">
                    <MessageSquare class="mr-2 size-4" />
                    <span>Report</span>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="blockUser(authorId)">
                    <Ban class="mr-2 size-4" />
                    <span>Block user</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>