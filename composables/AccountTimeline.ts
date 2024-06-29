import type { LysandClient } from "@lysand-org/client";
import type { Status } from "@lysand-org/client/types";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useAccountTimeline(
    client: LysandClient,
    accountId: string,
    options: Partial<TimelineOptions<Status>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) =>
            client.getAccountStatuses(accountId, opts),
        ...options,
    });
}
