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
import * as m from "~/paraglide/messages.js";

useHead({
    title: "Home",
});

definePageMeta({
    layout: "app",
    breadcrumbs: [
        {
            text: m.steep_aqua_fox_harbor(),
        },
        {
            text: m.bland_chunky_sparrow_propel(),
            href: "/home",
        },
    ],
    requiresAuth: true,
});
</script>