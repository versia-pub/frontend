<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Greeting />
            <Home />
        </TimelineScroller>
    </div>
</template>

<script setup lang="ts">
import Greeting from "~/components/headers/greeting.vue";
import Home from "~/components/timelines/home.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";

definePageMeta({
    layout: "app",
});
</script>