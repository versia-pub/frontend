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
import * as m from "~/paraglide/messages.js";

useHead({
    title: "Public",
});

definePageMeta({
    layout: "app",
    breadcrumbs: [
        {
            text: m.steep_aqua_fox_harbor(),
        },
        {
            text: m.lost_trick_dog_grace(),
            href: "/public",
        },
    ],
});
</script>