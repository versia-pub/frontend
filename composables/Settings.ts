import { StorageSerializers } from "@vueuse/core";
import {
    type SettingIds,
    type Settings,
    mergeSettings,
    settings as settingsJson,
} from "~/settings";

const useSettings = () => {
    return useLocalStorage<Settings>("versia:settings", settingsJson, {
        serializer: {
            read(raw) {
                const json = StorageSerializers.object.read(raw);

                return mergeSettings(json);
            },
            write(value) {
                const json = Object.fromEntries(
                    Object.entries(value).map(([key, value]) => [
                        key,
                        value.value,
                    ]),
                );

                // flatMap object values to .value
                return StorageSerializers.object.write(json);
            },
        },
    });
};

export const settings = useSettings();

export const useSetting = <Id extends SettingIds>(
    id: Id,
): Ref<Settings[Id]> => {
    const setting = ref(settings.value[id]) as Ref<Settings[Id]>;

    watch(settings, (newSettings) => {
        setting.value = newSettings[id];
    });

    watch(setting, (newSetting) => {
        settings.value = {
            ...settings.value,
            [id]: newSetting,
        };
    });

    return setting;
};
