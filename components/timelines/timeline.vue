<!-- Timeline.vue -->
<template>
    <div class="timeline rounded">
        <TransitionGroup name="timeline-item" tag="div"
            class="timeline-items *:rounded space-y-4 *:border">
            <TimelineItem :type="type" v-for="item in items" :key="item.id" :item="item" @update="updateItem"
                @delete="removeItem" />
        </TransitionGroup>

        <div v-if="isLoading" class="p-4 flex items-center justify-center h-48">
            <Loader class="size-8 animate-spin" />
        </div>

        <div v-if="error" class="timeline-error">
            {{ error.message }}
        </div>

        <!-- If there are some posts, but the user scrolled to the end -->
        <Card v-if="hasReachedEnd && items.length > 0" class="shadow-none bg-transparent border-none p-4">
            <CardHeader class="text-center gap-y-4">
                <CardTitle class="text-">No more data.</CardTitle>
                <CardDescription>
                    You've scrolled so far, there's nothing left to show.
                </CardDescription>
            </CardHeader>
        </Card>

        <!-- If there are no posts at all -->
        <Card v-else-if="hasReachedEnd && items.length === 0" class="shadow-none bg-transparent border-none p-4">
            <CardHeader class="text-center gap-y-4">
                <CardTitle class="text-">There's nothing to show here.</CardTitle>
                <CardDescription>
                    Either you're all caught up or there's nothing to show.
                </CardDescription>
            </CardHeader>
        </Card>

        <div v-else-if="!infiniteScroll.value" class="py-10 px-4">
            <Button variant="secondary" @click="loadNext" :disabled="isLoading" class="w-full">
                Load More
            </Button>
        </div>

        <div v-else ref="loadMoreTrigger" class="h-20"></div>
    </div>
</template>

<script lang="ts" setup>
import type { Notification, Status } from "@versia/client/types";
import { useIntersectionObserver } from "@vueuse/core";
import { Loader } from "lucide-vue-next";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { SettingIds } from "~/settings";
import { Button } from "../ui/button";
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