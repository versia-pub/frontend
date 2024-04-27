import type { Mastodon } from "megalodon";
import type { Status } from "~/types/mastodon/status";

export const useAccountTimeline = (
    client: Mastodon | null,
    id: MaybeRef<string | null>,
    options: MaybeRef<{
        limit?: number | undefined;
        max_id?: string | undefined;
        since_id?: string | undefined;
        min_id?: string | undefined;
        pinned?: boolean | undefined;
        exclude_replies?: boolean | undefined;
        exclude_reblogs?: boolean | undefined;
        only_media?: boolean;
    }>,
): {
    timeline: Ref<Status[]>;
    loadNext: () => Promise<void>;
    loadPrev: () => Promise<void>;
} => {
    return useIdTimeline(
        client,
        id,
        (client, options) =>
            client?.getAccountStatuses(ref(id).value ?? "", {
                only_media: false,
                ...options,
            }),
        options,
    );
};
