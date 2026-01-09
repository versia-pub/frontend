<template>
    <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
            <NuxtLink :href="urlAsPath">
                <Avatar
                    :src="note.account.avatar"
                    :name="note.account.display_name"
                />
            </NuxtLink>
            <div class="flex flex-col gap-0.5">
                <div class="flex items-center gap-1">
                    <span
                        class="text-sm font-semibold"
                        v-render-emojis="note.account.emojis"
                        >{{ note.account.display_name }}</span
                    >
                </div>
                <div
                    class="flex items-center gap-1 text-muted-foreground text-xs"
                >
                    <span>
                        @{{ `${username}${instance ? `@${instance}` : ""}` }}
                    </span>
                    <span>&middot;</span>
                    <span>{{ timeAgo }}</span>
                </div>
            </div>
        </div>
        <Menu @edit="emit('edit')" @delete="emit('delete')">
            <Button variant="ghost" size="icon">
                <Ellipsis />
            </Button>
        </Menu>
    </div>
</template>

<script lang="ts" setup>
import type {
    UseTimeAgoMessages,
    UseTimeAgoUnitNamesDefault,
} from "@vueuse/core";
import { Ellipsis } from "lucide-vue-next";
import Avatar from "../profiles/avatar.vue";
import { Button } from "../ui/button";
import Menu from "./menu.vue";
import { key } from "./provider";

// biome-ignore lint/style/noNonNullAssertion: We want an error if not provided
const { note } = inject(key)!;

const [username, instance] = note.account.acct.split("@");
const digitRegex = /\d/;
const accountUrl = wrapUrl(`/@${note.account.acct}`);
const urlAsPath = new URL(accountUrl).pathname;

const timeAgo = useTimeAgo(note.created_at, {
    messages: {
        justNow: "now",
        past: (n) => (n.match(digitRegex) ? `${n}` : n),
        future: (n) => (n.match(digitRegex) ? `in ${n}` : n),
        month: (n) => `${n}mo`,
        year: (n) => `${n}y`,
        day: (n) => `${n}d`,
        week: (n) => `${n}w`,
        hour: (n) => `${n}h`,
        minute: (n) => `${n}m`,
        second: (n) => `${n}s`,
        invalid: "",
    } as UseTimeAgoMessages<UseTimeAgoUnitNamesDefault>,
});

const emit = defineEmits<{
    edit: [];
    delete: [];
}>();
</script>
