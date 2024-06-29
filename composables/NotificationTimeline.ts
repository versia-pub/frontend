import type { LysandClient } from "@lysand-org/client";
import type { Notification } from "@lysand-org/client/types";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useNotificationTimeline(
    client: LysandClient,
    options: Partial<TimelineOptions<Notification>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getNotifications(opts),
        ...options,
    });
}
