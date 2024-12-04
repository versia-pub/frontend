<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Home v-if="identity" />
            <Public v-else />
        </TimelineScroller>
    </div>
</template>


<script setup lang="ts">
import Home from "~/components/timelines/home.vue";
import Public from "~/components/timelines/public.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";

definePageMeta({
    layout: "app",
    breadcrumbs: [
        {
            text: "Timelines",
        },
        identity.value
            ? {
                  text: "Home",
                  href: "/home",
              }
            : {
                  text: "Public",
                  href: "/public",
              },
    ],
});
</script>