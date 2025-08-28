import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useHomeTimeline(
    options: Partial<TimelineOptions<z.infer<typeof Status>>> = {},
) {
    const authStore = useAuthStore();

    return useTimeline({
        fetchFunction: (opts) => authStore.client.getHomeTimeline(opts),
        ...options,
    });
}
