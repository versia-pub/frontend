import type { Client } from "@versia/client";
import type { Status } from "@versia/client/types";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function usePublicTimeline(
    client: Client,
    options: Partial<TimelineOptions<Status>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getPublicTimeline(opts),
        ...options,
    });
}
