<template>
    <div class="mx-auto max-w-2xl w-full">
        <LazyTimelinesTimelineScroller>
            <LazyHeadersGreeting />
            <LazyTimelinesLocal />
        </LazyTimelinesTimelineScroller>
    </div>
</template>


<script lang="ts" setup>
definePageMeta({
    layout: "app",
});
</script>