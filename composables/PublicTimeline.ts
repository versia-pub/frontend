import type { Mastodon } from "megalodon";
import type { Status } from "~/types/mastodon/status";

export const usePublicTimeline = (
    client: Mastodon | null,
    options: MaybeRef<{
        only_media?: boolean;
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
        (client, options) => client?.getPublicTimeline(options),
        options,
    );
};
