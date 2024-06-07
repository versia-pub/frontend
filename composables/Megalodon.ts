import { LysandClient, type Token } from "@lysand-org/client";

export const useClient = (
    tokenData?: MaybeRef<Token | null>,
    disableOnServer = false,
): Ref<LysandClient | null> => {
    if (disableOnServer && process.server) {
        return ref(null);
    }

    return computed(
        () =>
            new LysandClient(
                new URL(useBaseUrl().value),
                toValue(tokenData)?.access_token,
            ),
    );
};
