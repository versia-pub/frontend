<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Local />
        </TimelineScroller>
    </div>
</template>


<script lang="ts" setup>
import Local from "~/components/timelines/local.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";

definePageMeta({
    layout: "app",
});
</script>