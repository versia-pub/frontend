<template>
    <Card
        class="flex-row gap-2 p-2 truncate items-center"
        :class="naked ? 'p-0 bg-transparent ring-0 border-none shadow-none' : ''"
    >
        <Avatar :src="account.avatar" :name="account.display_name" class="size-10" />
        <CardContent class="leading-tight">
            <span
                class="font-semibold"
                v-render-emojis="account.emojis"
                >{{ account.display_name }}</span
            >
            <span class="text-xs">
                @{{ account.username }}@{{ domain }}
            </span>
        </CardContent>
    </Card>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/schemas";
import type { z } from "zod";
import { Card, CardContent } from "~/components/ui/card";
import Avatar from "./avatar.vue";

const { account, domain, naked } = defineProps<{
    account: z.infer<typeof Account>;
    domain: string;
    naked?: boolean;
}>();
</script>

<style></style>
