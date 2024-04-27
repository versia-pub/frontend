import type { Mastodon } from "megalodon";
import type { Notification } from "~/types/mastodon/notification";

export const useNotificationTimeline = (
    client: Mastodon | null,
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
        (client, options) => client?.getNotifications(options),
        options,
    );
};
