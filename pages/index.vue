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
import * as m from "~/paraglide/messages.js";

useHead({
    title: identity.value
        ? m.bland_chunky_sparrow_propel()
        : m.lost_trick_dog_grace(),
});

definePageMeta({
    layout: "app",
    breadcrumbs: () => [
        {
            text: m.steep_aqua_fox_harbor(),
        },
        identity.value
            ? {
                  text: m.bland_chunky_sparrow_propel(),
                  href: "/home",
              }
            : {
                  text: m.lost_trick_dog_grace(),
                  href: "/public",
              },
    ],
});
</script>