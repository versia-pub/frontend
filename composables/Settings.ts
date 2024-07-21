import { StorageSerializers } from "@vueuse/core";
import {
    type Setting,
    type SettingIds,
    type Settings,
    parseFromJson,
    settings as settingsJson,
} from "~/settings";

const useSettings = () => {
    return useLocalStorage<Settings>("lysand:settings", settingsJson, {
        serializer: {
            read(raw) {
                const json = StorageSerializers.object.read(raw);

                return parseFromJson(json);
            },
            write(value) {
                // key/value, with key being id and value being the value
                const json = value.reduce(
                    (acc, setting) => {
                        acc[setting.id] = setting.value;
                        return acc;
                    },
                    {} as Record<string, unknown>,
                );

                return StorageSerializers.object.write(json);
            },
        },
    });
};

export const settings = useSettings();

export const useSetting = <T extends Setting = Setting>(id: SettingIds) => {
    const setting: Ref<T> = ref<T>(
        settings.value.find((s) => s.id === id) as T,
    ) as unknown as Ref<T>;

    watch(settings, (newSettings) => {
        setting.value = newSettings.find((s) => s.id === id) as T;
    });

    watch(setting, (newSetting) => {
        settings.value = settings.value.map((s) =>
            s.id === id ? newSetting : s,
        ) as Settings;
    });

    return setting;
};

export const getSetting = <T extends Setting = Setting>(id: SettingIds) => {
    return settingsJson.find((s) => s.id === id) as T;
};
