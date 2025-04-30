export const useLanguage = () => {
    return computed(() => preferences.language.value);
};
