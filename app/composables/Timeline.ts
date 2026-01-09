import type { Output } from "@versia/client";
import type { Notification, Status } from "@versia/client/schemas";
import { useIntervalFn } from "@vueuse/core";
import type { z } from "zod";

export interface TimelineOptions<T> {
    fetchFunction: (options: object) => Promise<Output<T[]>>;
    updateInterval?: number;
    limit?: number;
}

export function useTimeline<
    T extends z.infer<typeof Status> | z.infer<typeof Notification>,
>(options: TimelineOptions<T>) {
    const items = ref<T[]>([]) as Ref<T[]>;
    const isLoading = ref(false);
    const hasReachedEnd = ref(false);
    const error = ref<Error | null>(null);
    const authStore = useAuthStore();
    const { identityOptional } = storeToRefs(authStore);

    const nextMaxId = ref<string | undefined>(undefined);
    const prevMinId = ref<string | undefined>(undefined);

    const fetchItems = async (direction: "next" | "prev") => {
        if (isLoading.value || (direction === "next" && hasReachedEnd.value)) {
            return;
        }

        isLoading.value = true;
        error.value = null;

        try {
            const response = await options.fetchFunction({
                limit: options.limit || 20,
                max_id: direction === "next" ? nextMaxId.value : undefined,
                min_id: direction === "prev" ? prevMinId.value : undefined,
            });

            const newItems = response.data.filter(
                (item: T) =>
                    !items.value.some((existing) => existing.id === item.id),
            );

            if (direction === "next") {
                items.value.push(...newItems);
                if (newItems.length < (options.limit || 20)) {
                    hasReachedEnd.value = true;
                }
                if (newItems.length > 0) {
                    nextMaxId.value = newItems[newItems.length - 1]?.id;
                }
            } else {
                items.value.unshift(...newItems);
                if (newItems.length > 0) {
                    prevMinId.value = newItems[0]?.id;
                }
            }
        } catch (e) {
            error.value =
                e instanceof Error ? e : new Error("An error occurred");
        } finally {
            isLoading.value = false;
        }
    };

    const loadNext = () => fetchItems("next");
    const loadPrev = () => fetchItems("prev");

    const addItem = (newItem: T) => {
        items.value.unshift(newItem);
    };

    const removeItem = (id: string) => {
        const index = items.value.findIndex((item) => item.id === id);
        if (index !== -1) {
            items.value.splice(index, 1);
        }
    };

    const updateItem = (updatedItem: T) => {
        const index = items.value.findIndex(
            (item) => item.id === updatedItem.id,
        );
        if (index !== -1) {
            items.value[index] = updatedItem;
        }
    };

    // Set up periodic updates
    const { pause, resume } = useIntervalFn(() => {
        loadPrev();
    }, options.updateInterval || 30000);

    onMounted(() => {
        loadNext();
        resume();
    });

    onUnmounted(() => {
        pause();
    });

    watch(identityOptional, (newIdentity, oldIdentity) => {
        if (newIdentity?.id !== oldIdentity?.id) {
            // Reload timeline when identity changes
            items.value = [];
            nextMaxId.value = undefined;
            prevMinId.value = undefined;
            hasReachedEnd.value = false;
            error.value = null;
        }
    });

    return {
        items,
        isLoading,
        hasReachedEnd,
        error,
        loadNext,
        loadPrev,
        addItem,
        removeItem,
        updateItem,
    };
}
