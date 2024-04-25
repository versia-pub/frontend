<template>
    <div
        class="flex mx-auto md:pl-20 max-w-7xl min-h-screen flex-col gap-x-6 md:flex-row justify-center items-start md:py-12 lg:pr-8 relative">
        <div v-if="account" class="w-full rounded ring-1 md:max-w-lg ring-white/10 pb-10">
            <div class="w-full aspect-[8/3] border-b border-white/10 bg-dark-700">
                <img v-if="account.header" :src="account.header" class="object-cover w-full h-full" />
            </div>

            <div class="flex items-start justify-between px-4 py-3">
                <img class="-mt-[4.5rem] h-32 w-32 cursor-pointer rounded ring-white/10 ring-1 bg-dark-700"
                    :src="account.avatar" />
                <ButtonsSecondary>Edit Profile</ButtonsSecondary>
            </div>

            <div class="mt-2 px-4">
                <h2
                    class="text-xl font-bold text-gray-100 tracking-tight bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text">
                    {{ account.display_name }}
                    <Icon v-if="account.locked" name="tabler:lock" class="w-5 h-5 mb-0.5 text-gray-400 cursor-pointer"
                        title="This account manually approves its followers" />
                </h2>
                <span class="text-gray-400">@{{ account.acct }}</span>
            </div>

            <div class="mt-4 px-4">
                <div class="prose prose-invert" v-html="parsedNote"></div>
            </div>

            <div class="mt-3 flex items-center space-x-4 px-4">
                <div class="flex items-center space-x-1">
                    <Icon name="tabler:calendar" class="w-5 h-5 text-gray-400" />
                    <span class="text-gray-400">Created {{ formattedJoin }}</span>
                </div>
                <div v-if="account.bot" class="flex items-center space-x-1">
                    <Icon name="tabler:robot" class="w-5 h-5 text-gray-400" />
                    <span class="text-gray-400">Bot</span>
                </div>
            </div>

            <div class="mt-3 flex items-center space-x-4 px-4">
                <div class="cursor-pointer hover:underline space-x-1">
                    <span class="font-bold text-gray-200">{{ account.following_count }}</span>
                    <span class="text-gray-400">Following</span>
                </div>
                <div class="cursor-pointer hover:underline space-x-1">
                    <span class="font-bold text-gray-200">{{ account.followers_count }}</span>
                    <span class="text-gray-400">Followers</span>
                </div>
            </div>

            <div v-if="parsedFields.length > 0" class="mt-4 px-4 flex-col flex gap-y-3">
                <div v-for="field of parsedFields" :key="field.name.value" class="flex flex-col gap-1">
                    <span class="text-pink-500 font-semibold" v-html="field.name.value"></span>
                    <span class="text-gray-200 prose prose-invert break-all" v-html="field.value.value"></span>
                </div>
            </div>
        </div>
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
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const client = await useMegalodon();
const username = (route.params.username as string).replace("@", "");
const accounts = await useAccountSearch(client, username);
const account =
    (await accounts?.find((account) => account.acct === username)) ?? null;
const formattedJoin = Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
}).format(new Date(account?.created_at ?? 0));

useServerSeoMeta({
    title: account?.display_name,
    description: account?.note,
    ogImage: account?.avatar,
});

const isLoadingTimeline = ref(true);

const timelineParameters = ref({});
const hasReachedEnd = ref(false);
const { timeline, loadNext, loadPrev } = useAccountTimeline(
    client,
    account?.id ?? null,
    timelineParameters,
);
const skeleton = ref<HTMLSpanElement | null>(null);

const parsedNote = account
    ? await useParsedContent(account?.note, account?.emojis, [])
    : ref("");
const parsedFields = await Promise.all(
    account?.fields.map(async (field) => ({
        name: await useParsedContent(field.name, account.emojis, []),
        value: await useParsedContent(field.value, account.emojis, []),
    })) ?? [],
);

onMounted(() => {
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

watch(timeline, (newTimeline, oldTimeline) => {
    isLoadingTimeline.value = false;
    // If less than NOTES_PER_PAGE statuses are returned, we have reached the end
    if (newTimeline.length - oldTimeline.length < useConfig().NOTES_PER_PAGE) {
        hasReachedEnd.value = true;
    }
});
</script>