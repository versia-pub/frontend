<template>
    <Card
        as="article"
        :class="['relative gap-1.5 items-stretch bg-background', replyBar && 'pl-6']"
    >
        <div
            v-if="replyBar"
            class="absolute left-0 top-0 bottom-0 w-2 bg-border rounded-tl-md"
        />
        <CardHeader as="header" class="space-y-2">
            <ReblogHeader v-if="note.reblog" />
            <Header
                @edit="useEvent('composer:edit', noteToUse)"
                @delete="useEvent('note:delete', noteToUse)"
                class="z-1"
            />
        </CardHeader>
        <CardContent class="space-y-2">
            <Content />
            <Reactions
                v-if="noteToUse.reactions && noteToUse.reactions.length > 0"
            />
        </CardContent>
        <CardFooter v-if="!hideActions">
            <Actions
                @edit="useEvent('composer:edit', noteToUse)"
                @reply="useEvent('composer:reply', noteToUse)"
                @quote="useEvent('composer:quote', noteToUse)"
                @delete="useEvent('note:delete', noteToUse)"
            />
        </CardFooter>
    </Card>
</template>

<script setup lang="ts">
import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Actions from "./actions.vue";
import Content from "./content.vue";
import Header from "./header.vue";
import { key } from "./provider";
import Reactions from "./reactions/index.vue";
import ReblogHeader from "./reblog-header.vue";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const {
    note,
    hideActions,
    replyBar = false,
} = defineProps<{
    note: PartialBy<z.infer<typeof Status>, "reblog" | "quote">;
    hideActions?: boolean;
    replyBar?: boolean;
}>();

// Notes can be reblogs, in which case the actual thing to render is inside the reblog property
const noteToUse = computed(() =>
    note.reblog
        ? (note.reblog as z.infer<typeof Status>)
        : (note as z.infer<typeof Status>),
);

provide(key, {
    note: noteToUse.value,
    rebloggerNote: note.reblog ? (note as z.infer<typeof Status>) : undefined,
    isRemote: noteToUse.value.account.acct.includes("@"),
});
</script>
