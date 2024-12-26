<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Public />
        </TimelineScroller>
    </div>
</template>

<script setup lang="tsx">
import Public from "~/components/timelines/public.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~/paraglide/messages.js";

useHead({
    title: m.lost_trick_dog_grace(),
});

definePageMeta({
    layout: "app",
});
</script>
