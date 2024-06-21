import type { LysandClient } from "@lysand-org/client";
import type { Status } from "@lysand-org/client/types";

export const useLocalTimeline = (
    client: LysandClient | null,
    options: MaybeRef<
        Partial<{
            only_media: boolean;
            max_id: string;
            since_id: string;
            min_id: string;
            limit: number;
        }>
    >,
): {
    timeline: Ref<Status[]>;
    loadNext: () => Promise<void>;
    loadPrev: () => Promise<void>;
} => {
    return useTimeline(
        client,
        (client, options) => client?.getLocalTimeline(options),
        options,
    );
};
