import type { LysandClient } from "@lysand-org/client";
import type { Notification } from "@lysand-org/client/types";

export const useNotificationTimeline = (
    client: LysandClient | null,
    options: MaybeRef<{
        limit?: number | undefined;
        max_id?: string | undefined;
        since_id?: string | undefined;
        min_id?: string | undefined;
        exclude_types?: string[] | undefined;
        account_id?: string | undefined;
    }>,
): {
    timeline: Ref<Notification[]>;
    loadNext: () => Promise<void>;
    loadPrev: () => Promise<void>;
} => {
    return useTimeline(
        client,
        // @ts-expect-error dont listen to the voices jesse
        (client, options) => client?.getNotifications(options),
        options,
    );
};
