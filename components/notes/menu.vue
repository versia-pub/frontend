<script setup lang="ts">
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
                <DropdownMenuItem>
                    <Pencil class="mr-2 size-4" />
                    <span>Edit</span>
                    <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Code class="mr-2 size-4" />
                    <span>Copy API data</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link class="mr-2 size-4" />
                    <span>Copy link</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link class="mr-2 size-4" />
                    <span>Copy link (origin)</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ExternalLink class="mr-2 size-4" />
                    <span>Open on remote</span>
                    <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <Delete class="mr-2 size-4" />
                    <span>Delete and redraft</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash class="mr-2 size-4" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <MessageSquare class="mr-2 size-4" />
                    <span>Report</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Ban class="mr-2 size-4" />
                    <span>Block user</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>