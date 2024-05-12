<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelinesTimelineScroller>
            <HeadersGreeting />
            <TimelinesLocal />
        </TimelinesTimelineScroller>
    </div>
</template>


<script lang="ts" setup>
definePageMeta({
    layout: "app",
});
</script>