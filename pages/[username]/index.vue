<template>
    <ErrorBoundary>
        <div class="mx-auto max-w-2xl w-full">
            <TimelineScroller>
                <AccountProfile :account="account ?? undefined" />
                <AccountTimeline v-if="accountId" :id="accountId" :key="accountId" />
            </TimelineScroller>
        </div>
    </ErrorBoundary>
</template>

<script setup lang="ts">
import type { Account } from "@lysand-org/client/types";
import ErrorBoundary from "~/components/errors/ErrorBoundary.vue";
import AccountProfile from "~/components/social-elements/users/Account.vue";
import AccountTimeline from "~/components/timelines/account.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";

definePageMeta({
    layout: "app",
});

const route = useRoute();
const client = useClient();
const username = (route.params.username as string).replace("@", "");

const accounts = useAccountSearch(client, username);
watch(accounts, (newValue) => {
    if (Array.isArray(newValue)) {
        if (!newValue.find((account) => account.acct === username)) {
            useEvent("error", {
                title: "Account not found",
                message: `The account <code>@${username}</code> does not exist.`,
                code: "ERR_ACCOUNT_NOT_FOUND",
            });
        }
    }
});
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
    robots: computed(() => ({
        noindex: !!account.value?.noindex,
        nofollow: !!account.value?.noindex,
        noarchive: !!account.value?.noindex,
        noimageindex: !!account.value?.noindex,
    })),
});
</script>