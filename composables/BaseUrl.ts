export const useBaseUrl = () => {
    // Check if running on Onion URL
    if (useRequestURL().hostname.endsWith(".onion")) {
        return ref(
            useRuntimeConfig().public.onionApiHost ?? useRequestURL().origin,
        );
    }

    return ref(useRuntimeConfig().public.apiHost ?? useRequestURL().origin);
};
