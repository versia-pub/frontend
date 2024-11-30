<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Home />
        </TimelineScroller>
    </div>
</template>

<script setup lang="ts">
import Home from "~/components/timelines/home.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";

definePageMeta({
    layout: "app",
});
</script>