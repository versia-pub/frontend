import type { LysandClient } from "@lysand-org/client";
import type { Status } from "@lysand-org/client/types";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function usePublicTimeline(
    client: LysandClient,
    options: Partial<TimelineOptions<Status>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getPublicTimeline(opts),
        ...options,
    });
}
