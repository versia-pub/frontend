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

const { authorId } = defineProps<{
    apiNoteString: string;
    isRemote: boolean;
    url: string;
    remoteUrl: string;
    authorId: string;
}>();

const emit = defineEmits<{
    edit: [];
}>();

const { copy } = useClipboard();
const loggedIn = !!identity.value;
const authorIsMe = loggedIn && authorId === identity.value?.account.id;

const copyText = (text: string) => {
    copy(text);
    toast.success("Copied to clipboard");
};

const blockUser = async (id: string) => {
    await client.value.blockAccount(id);

    toast.success("User blocked");
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
                <DropdownMenuItem as="button">
                    <Delete class="mr-2 size-4" />
                    <span>Delete and redraft</span>
                </DropdownMenuItem>
                <DropdownMenuItem as="button">
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