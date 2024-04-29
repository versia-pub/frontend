import type { Mastodon } from "megalodon";
import type { Status } from "~/types/mastodon/status";

export const useHomeTimeline = (
    client: Mastodon | null,
    options: MaybeRef<{
        local?: boolean;
        limit?: number;
        max_id?: string;
        since_id?: string;
        min_id?: string;
    }>,
): {
    timeline: Ref<Status[]>;
    loadNext: () => Promise<void>;
    loadPrev: () => Promise<void>;
} => {
    return useTimeline(
        client,
        (client, options) => client?.getHomeTimeline(options),
        options,
    );
};
