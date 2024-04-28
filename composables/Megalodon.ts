import { Mastodon, type OAuth } from "megalodon";

export const useMegalodon = (
    tokenData?: MaybeRef<OAuth.TokenData | null>,
    disableOnServer = false,
): Ref<Mastodon | null> => {
    if (disableOnServer && process.server) {
        return ref(null);
    }

    return computed(
        () =>
            new Mastodon(useBaseUrl().value, toValue(tokenData)?.access_token),
    );
};
