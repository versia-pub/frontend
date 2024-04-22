import { Mastodon } from "megalodon";

export const useMegalodon = async () => {
    /*     if (process.server) {
        return null;
    } */

    const baseUrl = useBaseUrl().value;

    const client = new Mastodon(baseUrl);

    return client;
};
