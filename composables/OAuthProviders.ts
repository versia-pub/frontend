export const useOAuthProviders = async () => {
    if (process.server) return ref([]);
    const providers = await fetch(
        new URL("/oauth/providers", useBaseUrl().value),
    ).then((d) => d.json());
    return ref(
        providers as {
            name: string;
            icon: string;
            id: string;
        }[],
    );
};
