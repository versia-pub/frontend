<template>
    <Timeline :timeline="timeline" :load-next="loadNext" :load-prev="loadPrev" />
</template>

<script lang="ts" setup>
import Timeline from "./timeline.vue";

const props = defineProps<{
    id?: string;
}>();

const client = useClient();
const timelineParameters = ref({});
const { timeline, loadNext, loadPrev } = useAccountTimeline(
    client.value,
    props.id || null,
    timelineParameters,
);

useListen("note:delete", ({ id }) => {
    timeline.value = timeline.value.filter((note) => note.id !== id);
});
</script>