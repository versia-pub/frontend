<template>
    <Timeline :timeline="timeline" :load-next="loadNext" :load-prev="loadPrev" />
</template>

<script lang="ts" setup>
import Timeline from "./timeline.vue";

const client = useClient();
const timelineParameters = ref({});
const { timeline, loadNext, loadPrev } = usePublicTimeline(
    client.value,
    timelineParameters,
);

useListen("note:delete", ({ id }) => {
    timeline.value = timeline.value.filter((note) => note.id !== id);
});
</script>