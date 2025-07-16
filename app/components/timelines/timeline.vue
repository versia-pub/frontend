<template>
    <div
        role="status"
        class="flex flex-col gap-4 items-center *:max-w-2xl *:w-full p-4"
        >
        <TimelineItem
        :type="type"
        v-for="item in items"
        :key="item.id"
        :item="item"
        @update="updateItem"
        @delete="removeItem"
        />

        <Spinner v-if="isLoading" />

        <div v-if="error" class="timeline-error">
            {{ error.message }}
        </div>

        <!-- If there are some posts, but the user scrolled to the end -->
        <ReachedEnd v-if="hasReachedEnd && items.length > 0" />

        <!-- If there are no posts at all -->
        <NoPosts v-else-if="hasReachedEnd && items.length === 0" />

        <div v-else-if="!preferences.infinite_scroll" class="py-10 px-4">
            <Button
                variant="secondary"
                @click="loadNext"
                :disabled="isLoading"
                class="w-full"
            >
                {{ m.gaudy_bland_gorilla_talk() }}
            </Button>
        </div>

        <div v-else ref="loadMoreTrigger" class="h-20"></div>
    </div>
</template>

<script lang="ts" setup>
import type { Notification, Status } from "@versia/client/schemas";
import { useIntersectionObserver } from "@vueuse/core";
import type { z } from "zod";
import * as m from "~~/paraglide/messages.js";
import NoPosts from "../errors/NoPosts.vue";
import ReachedEnd from "../errors/ReachedEnd.vue";
import Spinner from "../graphics/spinner.vue";
import { Button } from "../ui/button";
import TimelineItem from "./timeline-item.vue";

const props = defineProps<{
    items: z.infer<typeof Status>[] | z.infer<typeof Notification>[];
    type: "status" | "notification";
    isLoading: boolean;
    hasReachedEnd: boolean;
    error: Error | null;
    loadNext: () => void;
    loadPrev: () => void;
    removeItem: (id: string) => void;
    updateItem:
        | ((item: z.infer<typeof Status>) => void)
        | ((item: z.infer<typeof Notification>) => void);
}>();

const emit = defineEmits<(e: "update") => void>();

const loadMoreTrigger = ref<HTMLElement | null>(null);

useIntersectionObserver(loadMoreTrigger, ([observer]) => {
    if (observer?.isIntersecting && !props.isLoading && !props.hasReachedEnd) {
        props.loadNext();
    }
});

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
