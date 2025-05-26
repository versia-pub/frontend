<template>
    <HoverCard @update:open="(open) => open && accounts === null && refreshReactions()">
        <HoverCardTrigger as-child>
            <Button variant="secondary" size="sm" class="gap-2">
                <img v-if="emoji" :src="emoji.url" :alt="emoji.shortcode"
                    class="h-[1lh] align-middle inline not-prose" />
                <span v-else>
                    {{ reaction.name }}
                </span>
                {{ formatNumber(reaction.count) }}
            </Button>
        </HoverCardTrigger>
        <HoverCardContent class="p-3">
            <Spinner v-if="accounts === null" class="border-0" />
            <ul v-else class="flex flex-col gap-4">
                <li
                    v-for="account in accounts">
                    <NuxtLink :to="`/@${account.acct}`" class="flex items-center gap-2">
                        <Avatar class="size-6" :key="account.id" :src="account.avatar"
                            :name="account.display_name || account.username" />
                        <span class="text-sm font-semibold line-clamp-1">
                            {{ account.display_name || account.username }}
                        </span>
                    </NuxtLink>
                </li>
            </ul>
        </HoverCardContent>
    </HoverCard>
</template>

<script lang="ts" setup>
import type {
    Account,
    CustomEmoji,
    NoteReaction,
} from "@versia/client/schemas";
import type { z } from "zod";
import Spinner from "~/components/graphics/spinner.vue";
import Avatar from "~/components/profiles/avatar.vue";
import { Button } from "~/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "~/components/ui/hover-card";
import { getLocale } from "~/paraglide/runtime.js";

const { reaction, emoji, statusId } = defineProps<{
    statusId: string;
    reaction: z.infer<typeof NoteReaction>;
    emoji?: z.infer<typeof CustomEmoji>;
}>();

const formatNumber = (number: number) =>
    new Intl.NumberFormat(getLocale(), {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(number);

const accounts = ref<z.infer<typeof Account>[] | null>(null);

const refreshReactions = async () => {
    const { data } = await client.value.getStatusReactions(statusId);
    const accountIds =
        data.find((r) => r.name === reaction.name)?.account_ids.slice(0, 10) ??
        [];

    const { data: accountsData } = await client.value.getAccounts(accountIds);

    accounts.value = accountsData;
};
</script>
