<template>
    <ClientOnly>
        <div class="mx-auto max-w-2xl w-full">
            <div class="shrink-0 p-10 h-dvh" v-if="!tokenData">
                <button type="button"
                    class="relative block h-full w-full rounded-lg border-2 border-dashed border-dark-300 p-12 text-center">
                    <Icon name="tabler:notification" class="mx-auto h-12 w-12 text-gray-400" />
                    <span class="mt-3 block text-sm font-semibold text-gray-200 max-w-56 mx-auto">Notifications
                        will
                        appear here
                        when you
                        sign in</span>
                </button>
            </div>
            <TimelinesTimelineScroller v-else>
                <HeadersGreeting />
                <div class="rounded overflow-hidden ring-1 ring-white/10">
                    <TimelinesNotifications />
                </div>
            </TimelinesTimelineScroller>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "app",
});
const tokenData = useTokenData();
</script>