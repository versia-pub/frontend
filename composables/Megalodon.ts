import { Mastodon } from "megalodon";

export const useMegalodon = (
    accessToken?: MaybeRef<string | null | undefined>,
    disableOnServer = false,
) => {
    if (disableOnServer && process.server) {
        return null;
    }

    const baseUrl = useBaseUrl().value;

    const client = new Mastodon(baseUrl, ref(accessToken).value);

    return client;
};
