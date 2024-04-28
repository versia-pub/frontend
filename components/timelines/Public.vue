<template>
    <TimelinesTimeline :timeline="timeline" :load-next="loadNext" :load-prev="loadPrev" />
</template>

<script lang="ts" setup>
const client = useMegalodon();
const timelineParameters = ref({});
const { timeline, loadNext, loadPrev } = usePublicTimeline(
    client.value,
    timelineParameters,
);

useListen("note:delete", ({ id }) => {
    timeline.value = timeline.value.filter((note) => note.id !== id);
});
</script>