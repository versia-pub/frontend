<template>
    <TimelinesTimeline :timeline="timeline" :load-next="loadNext" :load-prev="loadPrev" @delete="noteDelete" />
</template>

<script lang="ts" setup>
const client = useMegalodon();
const timelineParameters = ref({});
const { timeline, loadNext, loadPrev } = useLocalTimeline(
    client.value,
    timelineParameters,
);

const noteDelete = async (id: string) => {
    timeline.value = timeline.value.filter((note) => note.id !== id);
};
</script>