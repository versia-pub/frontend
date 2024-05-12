<template>
    <div class="mx-auto max-w-2xl w-full">
        <TimelinesTimelineScroller>
            <HeadersGreeting />
            <TimelinesPublic />
        </TimelinesTimelineScroller>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    layout: "app",
});
</script>