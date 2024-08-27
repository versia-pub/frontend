import type { Client } from "@versia/client";
import type { Notification } from "@versia/client/types";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useNotificationTimeline(
    client: Client,
    options: Partial<TimelineOptions<Notification>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getNotifications(opts),
        ...options,
    });
}
