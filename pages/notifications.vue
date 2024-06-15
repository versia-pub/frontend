<template>
    <div class="mx-auto max-w-2xl w-full">
        <div class="shrink-0 p-10 h-dvh" v-if="!identity">
            <button type="button"
                class="relative block h-full w-full rounded-lg border-2 border-dashed border-dark-300 p-12 text-center">
                <iconify-icon name="tabler:notification" width="3rem" height="3rem" class="mx-auto text-gray-400" />
                <span class="mt-3 block text-sm font-semibold text-gray-200 max-w-56 mx-auto">Notifications
                    will
                    appear here
                    when you
                    sign in</span>
            </button>
        </div>
        <LazyTimelinesTimelineScroller v-else>
            <LazyHeadersGreeting />
            <div class="rounded overflow-hidden ring-1 ring-white/10">
                <LazyTimelinesNotifications />
            </div>
        </LazyTimelinesTimelineScroller>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "app",
});
const identity = useCurrentIdentity();
</script>