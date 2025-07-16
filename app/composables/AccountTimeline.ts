import type { Client } from "@versia/client";
import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useAccountTimeline(
    client: Client,
    accountId: string,
    options: Partial<TimelineOptions<z.infer<typeof Status>>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) =>
            client.getAccountStatuses(accountId, opts),
        ...options,
    });
}
