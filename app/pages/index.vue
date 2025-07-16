<template>
    <TimelineScroller>
        <Home v-if="identity" />
        <Public v-else />
    </TimelineScroller>
</template>

<script setup lang="tsx">
import Home from "~/components/timelines/home.vue";
import Public from "~/components/timelines/public.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~~/paraglide/messages.js";

useHead({
    title: identity.value
        ? m.bland_chunky_sparrow_propel()
        : m.lost_trick_dog_grace(),
});

definePageMeta({
    layout: "app",
});
</script>
