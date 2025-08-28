import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useGlobalTimeline(
    options: Partial<TimelineOptions<z.infer<typeof Status>>> = {},
) {
    const authStore = useAuthStore();

    return useTimeline({
        // TODO: Implement global timeline in client sdk
        fetchFunction: (opts) => authStore.client.getPublicTimeline(opts),
        ...options,
    });
}
