import type { Client } from "@versia/client";
import type { Status } from "@versia/client/types";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useHomeTimeline(
    client: Client,
    options: Partial<TimelineOptions<Status>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getHomeTimeline(opts),
        ...options,
    });
}
