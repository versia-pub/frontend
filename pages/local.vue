<template>
    <OverlayScrollbarsComponent :defer="true" class="max-h-dvh overflow-y-auto">
        <TimelinesTimelineScroller>
            <TimelinesLocal />
        </TimelinesTimelineScroller>
    </OverlayScrollbarsComponent>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "#imports";
definePageMeta({
    layout: "app",
});
</script>