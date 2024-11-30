<!-- Timeline.vue -->
<template>
    <div class="timeline rounded overflow-hidden">
        <TransitionGroup name="timeline-item" tag="div" class="timeline-items *:rounded space-y-4 *:border *:border-border/50">
            <TimelineItem :type="type" v-for="item in items" :key="item.id" :item="item" @update="updateItem"
                @delete="removeItem" />
        </TransitionGroup>

        <!-- <TimelineItem v-if="isLoading" :type="type" v-for="_ in 5" /> -->

        <div v-if="error" class="timeline-error">
            {{ error.message }}
        </div>

        <div v-if="hasReachedEnd && items.length > 0"
            class="flex flex-col items-center justify-center gap-2 text-gray-200 text-center p-10">
            <span class="text-lg font-semibold">You've scrolled so far, there's nothing left to show.</span>
            <span class="text-sm">You can always go back and see what you missed.</span>
        </div>

        <div v-else-if="hasReachedEnd && items.length === 0"
            class="flex flex-col items-center justify-center gap-2 text-gray-200 text-center p-10">
            <span class="text-lg font-semibold">There's nothing to show here.</span>
            <span class="text-sm">Either you're all caught up or there's nothing to show.</span>
        </div>

        <div v-else-if="!infiniteScroll.value" class="py-10 px-4">
            <Button theme="secondary" @click="loadNext" :disabled="isLoading" class="w-full">
                Load More
            </Button>
        </div>

        <div v-else ref="loadMoreTrigger" class="h-20"></div>
    </div>
</template>

<script lang="ts" setup>
import type { Notification, Status } from "@versia/client/types";
import { useIntersectionObserver } from "@vueuse/core";
import { onMounted, watch } from "vue";
import Button from "~/packages/ui/components/buttons/button.vue";
import { SettingIds } from "~/settings";
import TimelineItem from "./timeline-item.vue";

const props = defineProps<{
    items: Status[] | Notification[];
    type: "status" | "notification";
    isLoading: boolean;
    hasReachedEnd: boolean;
    error: Error | null;
    loadNext: () => void;
    loadPrev: () => void;
    removeItem: (id: string) => void;
    updateItem: ((item: Status) => void) | ((item: Notification) => void);
}>();

const emit = defineEmits<(e: "update") => void>();

const loadMoreTrigger = ref<HTMLElement | null>(null);

useIntersectionObserver(loadMoreTrigger, ([observer]) => {
    if (observer?.isIntersecting && !props.isLoading && !props.hasReachedEnd) {
        props.loadNext();
    }
});

const infiniteScroll = useSetting(SettingIds.InfiniteScroll);

watch(
    () => props.items,
    () => {
        emit("update");
    },
);

onMounted(() => {
    props.loadNext();
});
</script>

<style scoped>
.timeline-item-enter-active,
.timeline-item-leave-active {
    transition: all 0.5s ease;
}

.timeline-item-enter-from,
.timeline-item-leave-to {
    opacity: 0;
    scale: 0.99;
}
</style>