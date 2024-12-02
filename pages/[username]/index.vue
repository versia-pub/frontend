<template>
    <div class="mx-auto max-w-2xl w-full space-y-2">
        <div v-if="isLoading" class="p-4 flex items-center justify-center h-48">
            <Loader class="size-8 animate-spin" />
        </div>
        <TimelineScroller v-else-if="account">
            <AccountProfile :account="account" />
            <AccountTimeline v-if="accountId" :id="accountId" :key="accountId" />
        </TimelineScroller>
        <Card v-else class="shadow-none bg-transparent border-none p-4">
            <CardHeader class="text-center gap-y-4">
                <CardTitle class="text-">Account not found.</CardTitle>
                <CardDescription>
                    Check for typos or try again later.
                </CardDescription>
            </CardHeader>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Loader } from "lucide-vue-next";
import AccountProfile from "~/components/profiles/profile.vue";
import AccountTimeline from "~/components/timelines/account.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";

definePageMeta({
    layout: "app",
});

const route = useRoute();
const username = (route.params.username as string).startsWith("@")
    ? (route.params.username as string).substring(1)
    : (route.params.username as string);

const { account, isLoading } = useAccountFromAcct(client, username);
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