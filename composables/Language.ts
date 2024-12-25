import { SettingIds } from "~/settings";

export const useLanguage = () => {
    const lang = useSetting(SettingIds.Language);

    return computed(() => lang.value.value as "en" | "fr" | "en-pt");
};
