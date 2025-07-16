import type { Client } from "@versia/client";
import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useGlobalTimeline(
    client: Client,
    options: Partial<TimelineOptions<z.infer<typeof Status>>> = {},
) {
    return useTimeline(client, {
        // TODO: Implement global timeline in client sdk
        fetchFunction: (client, opts) => client.getPublicTimeline(opts),
        ...options,
    });
}
