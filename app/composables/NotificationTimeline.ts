import type { Client } from "@versia/client";
import type { Notification } from "@versia/client/schemas";
import type { z } from "zod";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useNotificationTimeline(
    options: Partial<TimelineOptions<z.infer<typeof Notification>>> = {},
) {
    const authStore = useAuthStore();

    return useTimeline({
        fetchFunction: (opts) => authStore.client.getNotifications(opts),
        ...options,
    });
}
