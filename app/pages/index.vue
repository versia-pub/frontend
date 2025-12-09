<template>
    <TimelineScroller>
        <Home v-if="authStore.isSignedIn"/>
        <Public v-else/>
    </TimelineScroller>
</template>

<script setup lang="tsx">
import Home from "~/components/timelines/home.vue";
import Public from "~/components/timelines/public.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~~/paraglide/messages.js";

const authStore = useAuthStore();
useHead({
    title: authStore.isSignedIn
        ? m.bland_chunky_sparrow_propel()
        : m.lost_trick_dog_grace(),
});

definePageMeta({
    layout: "app",
});
</script>
