<template>
    <TimelineScroller>
        <Public />
    </TimelineScroller>
</template>

<script setup lang="tsx">
import Public from "~/components/timelines/public.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~~/paraglide/messages.js";

useHead({
    title: m.lost_trick_dog_grace(),
});

definePageMeta({
    layout: "app",
});
</script>
