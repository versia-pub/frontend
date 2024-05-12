<template>
    <OverlayScrollbarsComponent :defer="true" class="max-h-dvh overflow-y-auto">
        <TimelinesTimelineScroller>
            <TimelinesHome />
        </TimelinesTimelineScroller>
    </OverlayScrollbarsComponent>
</template>

<script setup lang="ts">
import { OverlayScrollbarsComponent } from "#imports";
definePageMeta({
    layout: "app",
});
</script>