import type { LysandClient } from "@lysand-org/client";
import type { Status } from "@lysand-org/client/types";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useHomeTimeline(
    client: LysandClient,
    options: Partial<TimelineOptions<Status>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getHomeTimeline(opts),
        ...options,
    });
}
