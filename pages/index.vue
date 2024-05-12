<template>
    <div class="mx-auto max-w-2xl w-full">
        <LazyTimelinesTimelineScroller>
            <LazyHeadersGreeting />
            <LazyTimelinesPublic />
        </LazyTimelinesTimelineScroller>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    layout: "app",
});
</script>