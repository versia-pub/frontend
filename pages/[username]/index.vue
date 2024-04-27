<template>
    <NuxtLayout name="app">
        <SocialElementsUsersAccount v-if="isMobile" :account="account ?? undefined" />
        <TimelinesAccount :id="accountId ?? undefined" :key="accountId ?? undefined" />

        <template #right>
            <SocialElementsUsersAccount v-if="!isMobile" :account="account ?? undefined" />
            <div v-else>

            </div>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { Account } from "~/types/mastodon/account";

definePageMeta({
    layout: false,
});

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 1024);

const route = useRoute();
const client = useMegalodon(undefined, true);
const username = (route.params.username as string).replace("@", "");

const accounts = useAccountSearch(client, username);
const account = computed<Account | null>(
    () => accounts.value?.find((account) => account.acct === username) ?? null,
);
const accountId = computed(() => account.value?.id ?? null);

useServerSeoMeta({
    title: account.value?.display_name,
    description: account.value?.note,
    ogImage: account.value?.avatar,
    profileUsername: account.value?.acct,
});
</script>