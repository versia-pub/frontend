<template>
    <ClientOnly>
        <div class="max-w-2xl mx-auto md:py-20 md:px-10">
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
</template>

<script lang="ts" setup>
const client = await useMegalodon();

const isLoading = ref(true);

const timelineParameters = ref({});
const hasReachedEnd = ref(false);
const { timeline, loadNext, loadPrev } = usePublicTimeline(
    client,
    timelineParameters,
);
const skeleton = ref<HTMLSpanElement | null>(null);

onMounted(() => {
    useIntersectionObserver(skeleton, async (entries) => {
        if (
            entries[0].isIntersecting &&
            !hasReachedEnd.value &&
            !isLoading.value
        ) {
            isLoading.value = true;
            await loadNext();
        }
    });
});

watch(timeline, (newTimeline, oldTimeline) => {
    isLoading.value = false;
    // If less than NOTES_PER_PAGE statuses are returned, we have reached the end
    if (newTimeline.length - oldTimeline.length < useConfig().NOTES_PER_PAGE) {
        hasReachedEnd.value = true;
    }
});
</script>