<template>
    <TimelinesTimeline :timeline="timeline" :load-next="loadNext" :load-prev="loadPrev" />
</template>

<script lang="ts" setup>
const tokenData = useTokenData();
const client = useClient(tokenData);
const timelineParameters = ref({});
const { timeline, loadNext, loadPrev } = useHomeTimeline(
    client.value,
    timelineParameters,
);

useListen("note:delete", ({ id }) => {
    timeline.value = timeline.value.filter((note) => note.id !== id);
});
</script>