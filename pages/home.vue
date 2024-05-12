<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelinesTimelineScroller>
            <HeadersGreeting />
            <TimelinesHome />
        </TimelinesTimelineScroller>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "app",
});

const me = useMe();
</script>