<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Global />
        </TimelineScroller>
    </div>
</template>

<script setup lang="ts">
import Global from "~/components/timelines/global.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";

definePageMeta({
    layout: "app",
});
</script>