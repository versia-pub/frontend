<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Public />
        </TimelineScroller>
    </div>
</template>


<script setup lang="ts">
import Public from "~/components/timelines/public.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";

definePageMeta({
    layout: "app",
});
</script>