<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Global />
        </TimelineScroller>
    </div>
</template>

<script setup lang="tsx">
import Global from "~/components/timelines/global.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~/paraglide/messages.js";

useHead({
    title: m.real_tame_moose_greet(),
});

definePageMeta({
    layout: "app",
});
</script>
