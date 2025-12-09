<template>
    <TimelineScroller>
        <Home/>
    </TimelineScroller>
</template>

<script setup lang="tsx">
import Home from "~/components/timelines/home.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~~/paraglide/messages.js";

useHead({
    title: m.bland_chunky_sparrow_propel(),
});

definePageMeta({
    layout: "app",
    requiresAuth: true,
});
</script>
