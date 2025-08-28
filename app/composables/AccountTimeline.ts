import type { Status } from "@versia/client/schemas";
import type { z } from "zod";
import { type TimelineOptions, useTimeline } from "./Timeline";

export function useAccountTimeline(
    accountId: string,
    options: Partial<TimelineOptions<z.infer<typeof Status>>> = {},
) {
    const authStore = useAuthStore();

    return useTimeline({
        fetchFunction: (opts) =>
            authStore.client.getAccountStatuses(accountId, opts),
        ...options,
    });
}
