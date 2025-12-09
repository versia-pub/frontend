<template>
    <TimelineScroller>
        <Local/>
    </TimelineScroller>
</template>

<script lang="tsx" setup>
import Local from "~/components/timelines/local.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~~/paraglide/messages.js";

useHead({
    title: m.crazy_game_parrot_pave(),
});

definePageMeta({
    layout: "app",
});
</script>
