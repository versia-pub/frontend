<template>
    <NuxtLayout name="app">
        <SocialElementsUsersAccount v-if="isMobile" :account="account ?? undefined" />
        <ClientOnly>
            <div class="w-full">
                <SocialElementsNotesNote v-for="note of timeline" :key="note.id" :note="note" />
                <span ref="skeleton"></span>
                <SocialElementsNotesNote v-for="index of 5" v-if="!hasReachedEnd" :skeleton="true" />

                <div v-if="hasReachedEnd"
                    class="text-center flex flex-row justify-center items-center py-10 text-gray-400 gap-3">
                    <Icon name="tabler:message-off" class="h-6 w-6" />
                    <span>No more posts, you've seen them all</span>
                </div>
            </div>
        </ClientOnly>

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

onMounted(async () => {
    useIntersectionObserver(skeleton, async (entries) => {
        if (
            entries[0].isIntersecting &&
            !hasReachedEnd.value &&
            !isLoadingTimeline.value
        ) {
            isLoadingTimeline.value = true;
            await loadNext();
        }
    });
});

useServerSeoMeta({
    title: account.value?.display_name,
    description: account.value?.note,
    ogImage: account.value?.avatar,
    profileUsername: account.value?.acct,
});

const isLoadingTimeline = ref(true);

const timelineParameters = ref({});
const hasReachedEnd = ref(false);
const { timeline, loadNext, loadPrev } = useAccountTimeline(
    client.value,
    accountId,
    timelineParameters,
);
const skeleton = ref<HTMLSpanElement | null>(null);

watch(timeline, (newTimeline, oldTimeline) => {
    isLoadingTimeline.value = false;
    // If less than NOTES_PER_PAGE statuses are returned, we have reached the end
    if (newTimeline.length - oldTimeline.length < useConfig().NOTES_PER_PAGE) {
        hasReachedEnd.value = true;
    }
});
</script>