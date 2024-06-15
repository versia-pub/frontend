<template>
    <SocialElementsNotificationsNotif v-for="notif of timeline" :key="notif.id" :notification="notif" />
    <span ref="skeleton"></span>
    <SocialElementsNotificationsNotif v-for="index of 5" v-if="!hasReachedEnd" :skeleton="true" />

    <div v-if="hasReachedEnd" class="text-center flex flex-row justify-center items-center py-10 text-gray-400 gap-3">
        <iconify-icon name="tabler:message-off" width="1.5rem" height="1.5rem" />
        <span>No more notifications, you've seen them all</span>
    </div>
</template>

<script lang="ts" setup>
const client = useClient();

const isLoading = ref(true);

const timelineParameters = ref({});
const hasReachedEnd = ref(false);
const { timeline, loadNext, loadPrev } = useNotificationTimeline(
    client.value,
    timelineParameters,
);
const skeleton = ref<HTMLSpanElement | null>(null);

onMounted(() => {
    useIntersectionObserver(skeleton, async (entries) => {
        if (
            entries[0]?.isIntersecting &&
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