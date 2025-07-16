import type { Client } from "@versia/client";
import type { Notification } from "@versia/client/schemas";
import type { z } from "zod";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useNotificationTimeline(
    client: Client,
    options: Partial<TimelineOptions<z.infer<typeof Notification>>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getNotifications(opts),
        ...options,
    });
}
