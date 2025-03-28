<template>
    <Card
        class="flex-row gap-4 p-2"
        :class="naked ? 'p-0 bg-transparent ring-0 border-none' : ''"
    >
        <Avatar :src="account.avatar" :name="account.display_name" size="sm" />
        <CardContent class="gap-1">
            <span
                class="truncate font-semibold"
                v-render-emojis="account.emojis"
                >{{ account.display_name }}</span
            >
            <span class="truncate text-xs">
                @{{ account.username }}@{{ domain }}
            </span>
        </CardContent>
    </Card>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/types";
import { Card, CardContent } from "~/components/ui/card";
import Avatar from "./avatar.vue";

const { account, domain, naked } = defineProps<{
    account: Account;
    domain: string;
    naked?: boolean;
}>();
</script>

<style></style>
