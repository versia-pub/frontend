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
    Check,
    Code,
    Delete,
    ExternalLink,
    Link,
    MessageSquare,
    Pencil,
    Trash,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

defineProps<{
    apiNoteString: string;
    isRemote: boolean;
    url: string;
    remoteUrl: string;
    authorId: string;
}>();

const { copy } = useClipboard();

const copyText = (text: string) => {
    copy(text);
    toast("Copied to clipboard", {
        icon: <Check class="size-5 text-green-500" />,
    });
};

const blockUser = async (id: string) => {
    await client.value.blockAccount(id);

    toast("User blocked", {
        icon: <Ban class="size-5 text-destructive" />,
    });
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
                <DropdownMenuItem as="button">
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
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
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
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
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