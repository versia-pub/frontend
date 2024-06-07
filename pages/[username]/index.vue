<template>
    <div class="mx-auto max-w-2xl w-full">
        <LazyTimelinesTimelineScroller>
            <LazySocialElementsUsersAccount :account="account ?? undefined" />
            <LazyTimelinesAccount :id="accountId" :key="accountId" />
        </LazyTimelinesTimelineScroller>
    </div>
</template>

<script setup lang="ts">
import type { Account } from "~/types/mastodon/account";

definePageMeta({
    layout: "app",
});

const route = useRoute();
const client = useClient(undefined, true);
const username = (route.params.username as string).replace("@", "");

const accounts = useAccountSearch(client, username);
const account = computed<Account | null>(
    () => accounts.value?.find((account) => account.acct === username) ?? null,
);
const accountId = computed(() => account.value?.id ?? undefined);

useServerSeoMeta({
    title: computed(() =>
        account.value ? account.value.display_name : "Loading",
    ),
    ogTitle: computed(() =>
        account.value ? account.value.display_name : "Loading",
    ),
    ogImage: computed(() => (account.value ? account.value.avatar : undefined)),
    ogType: "profile",
    ogDescription: computed(() =>
        account.value ? account.value.note : undefined,
    ),
    description: computed(() =>
        account.value ? account.value.note : undefined,
    ),
});
</script>