<template>
    <Card as="article" class="rounded-none border-0 hover:bg-muted/50 duration-200">
        <CardHeader class="pb-4">
            <Header :avatar="note.account.avatar" :acct="note.account.acct" :display-name="note.account.display_name"
                :visibility="note.visibility" :url="accountUrl" :created-at="new Date(note.created_at)" />
        </CardHeader>
        <CardContent>
            <Content :content="note.content" />
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import type { Status } from "@versia/client/types";
import { Card, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import Content from "./content.vue";
import Header from "./header.vue";

const { note } = defineProps<{
    note: Status;
}>();

const url = `/@${note.account.acct}/${note.id}`;
const accountUrl = `/@${note.account.acct}`;
</script>