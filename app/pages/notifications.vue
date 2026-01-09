<template>
    <TimelineScroller>
        <div class="rounded overflow-hidden">
            <Notifications />
        </div>
    </TimelineScroller>
</template>

<script lang="ts" setup>
import Notifications from "~/components/timelines/notifications.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~~/paraglide/messages.js";

useHead({
    title: m.that_patchy_mare_snip(),
});

definePageMeta({
    layout: "app",
    breadcrumbs: () => [
        {
            text: m.that_patchy_mare_snip(),
            href: "/notifications",
        },
    ],
    requiresAuth: true,
});
</script>
