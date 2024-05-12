<template>
    <ClientOnly>
        <TransitionGroup leave-active-class="ease-in duration-200" leave-from-class="scale-100 opacity-100"
            leave-to-class="opacity-0 scale-90">
            <SocialElementsNotesNote v-for="note of timeline" :key="note.id" :note="note" />
        </TransitionGroup>
        <span ref="skeleton"></span>
        <LazySocialElementsNotesNote v-for="index of 5" v-if="!hasReachedEnd" :skeleton="true" />

        <div v-if="hasReachedEnd"
            class="text-center flex flex-row justify-center items-center py-10 text-gray-400 gap-3">
            <iconify-icon icon="tabler:message-off" width="1.5rem" height="1.5rem" />
            <span>No more posts, you've seen them all</span>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
import type { Status } from "~/types/mastodon/status";

const props = defineProps<{
    timeline: Status[];
    loadNext: () => Promise<void>;
    loadPrev: () => Promise<void>;
}>();

const isLoading = ref(true);

const hasReachedEnd = ref(false);
const skeleton = ref<HTMLSpanElement | null>(null);

onMounted(() => {
    useIntersectionObserver(skeleton, async (entries) => {
        if (
            entries[0].isIntersecting &&
            !hasReachedEnd.value &&
            !isLoading.value
        ) {
            isLoading.value = true;
            await props.loadNext();
        }
    });
});

useListen("composer:send", () => {
    props.loadPrev();
});

// Every 5 seconds, load newer posts (prev)
useIntervalFn(() => {
    props.loadPrev();
}, 10000);

watch(
    () => props.timeline,
    (newTimeline, oldTimeline) => {
        // If posts are deleted, don't start loading more posts
        if (newTimeline.length === oldTimeline.length - 1) return;
        isLoading.value = false;
        // If less than NOTES_PER_PAGE statuses are returned, we have reached the end
        if (
            newTimeline.length - oldTimeline.length <
            useConfig().NOTES_PER_PAGE
        ) {
            hasReachedEnd.value = true;
        }
    },
);
</script>