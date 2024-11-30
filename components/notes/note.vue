<template>
    <Card as="article" class="rounded-none border-0 duration-200 shadow-none">
        <CardHeader class="pb-4">
            <ReblogHeader v-if="!!note.reblog" :avatar="note.account.avatar"
                :display-name="note.account.display_name" />
            <Header :avatar="noteToUse.account.avatar" :corner-avatar="note.reblog ? note.account.avatar : undefined"
                :acct="noteToUse.account.acct" :display-name="noteToUse.account.display_name"
                :visibility="noteToUse.visibility" :url="accountUrl" :created-at="new Date(noteToUse.created_at)" />
        </CardHeader>
        <CardContent>
            <Content :content="noteToUse.content" />
        </CardContent>
        <CardFooter>
            <Actions :reply-count="noteToUse.replies_count" :like-count="noteToUse.favourites_count"
                :reblog-count="noteToUse.reblogs_count" />
        </CardFooter>
    </Card>
</template>

<script setup lang="ts">
import type { Status } from "@versia/client/types";
import { Card, CardFooter, CardHeader } from "../ui/card";
import Actions from "./actions.vue";
import Content from "./content.vue";
import Header from "./header.vue";
import ReblogHeader from "./reblog-header.vue";

const { note } = defineProps<{
    note: Status;
}>();

// Notes can be reblogs or quotes, in which case
// the actual thing to render is inside the reblog or quote
const noteToUse = note.reblog ? note.reblog : note.quote ? note.quote : note;

const url = `/@${noteToUse.account.acct}/${noteToUse.id}`;
const accountUrl = `/@${noteToUse.account.acct}`;
</script>
