export const useBaseUrl = () => {
    return ref(useRuntimeConfig().public.apiHost ?? useRequestURL().origin);
};
