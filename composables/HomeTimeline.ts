import type { Client } from "@versia/client";
import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useHomeTimeline(
    client: Client,
    options: Partial<TimelineOptions<z.infer<typeof Status>>> = {},
) {
    return useTimeline(client, {
        fetchFunction: (client, opts) => client.getHomeTimeline(opts),
        ...options,
    });
}
