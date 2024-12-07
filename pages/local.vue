<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelineScroller>
            <Local />
        </TimelineScroller>
    </div>
</template>


<script lang="ts" setup>
import Local from "~/components/timelines/local.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import * as m from "~/paraglide/messages.js";

useHead({
    title: m.crazy_game_parrot_pave(),
});

definePageMeta({
    layout: "app",
    breadcrumbs: [
        {
            text: m.steep_aqua_fox_harbor(),
        },
        {
            text: m.crazy_game_parrot_pave(),
            href: "/local",
        },
    ],
});
</script>