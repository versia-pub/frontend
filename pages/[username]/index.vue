<template>
    <div class="mx-auto max-w-2xl w-full space-y-2">
        <div v-if="isLoading" class="p-4 flex items-center justify-center h-48">
            <Loader class="size-8 animate-spin" />
        </div>
        <TimelineScroller v-else-if="account">
            <div class="p-4 pb-0">
                <AccountProfile :account="account" />
            </div>
            <AccountTimeline
                v-if="accountId"
                :id="accountId"
                :key="accountId"
            />
        </TimelineScroller>
        <NotFound v-else />
    </div>
</template>

<script setup lang="ts">
import { Loader } from "lucide-vue-next";
import NotFound from "~/components/errors/NotFound.vue";
import AccountProfile from "~/components/profiles/profile.vue";
import AccountTimeline from "~/components/timelines/account.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~/paraglide/messages.js";

const route = useRoute();
const username = (route.params.username as string).startsWith("@")
    ? (route.params.username as string).substring(1)
    : (route.params.username as string);

definePageMeta({
    layout: "app",
    breadcrumbs: () => [
        {
            text: m.tough_nice_ox_drum(),
        },
    ],
});

const { account, isLoading } = useAccountFromAcct(client, username);
const accountId = computed(() => account.value?.id ?? undefined);

useSeoMeta({
    title: computed(() =>
        account.value ? account.value.display_name : m.steep_sour_warthog_aim(),
    ),
    ogTitle: computed(() =>
        account.value ? account.value.display_name : m.steep_sour_warthog_aim(),
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
