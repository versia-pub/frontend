import { StorageSerializers } from "@vueuse/core";
import { preferences as prefs } from "~/components/preferences2/preferences.ts";

type SerializedPreferences = {
    [K in keyof typeof prefs]: (typeof prefs)[K]["options"]["defaultValue"];
};

const usePreferences = (): {
    [K in keyof typeof prefs]: WritableComputedRef<
        (typeof prefs)[K]["options"]["defaultValue"]
    >;
} => {
    const localStorage = useLocalStorage<SerializedPreferences>(
        "versia:preferences",
        Object.fromEntries(
            Object.entries(prefs).map(([key, value]) => [
                key,
                value.options.defaultValue,
            ]),
        ) as SerializedPreferences,
        {
            serializer: {
                read(raw) {
                    return StorageSerializers.object.read(raw);
                },
                write(value) {
                    return StorageSerializers.object.write(value);
                },
            },
        },
    );

    return Object.fromEntries(
        Object.entries(prefs).map(([key, value]) => [
            key,
            computed({
                get() {
                    return (
                        localStorage.value[key as keyof typeof prefs] ??
                        value.options.defaultValue
                    );
                },
                set(newValue) {
                    // @ts-expect-error Key is marked as readonly in the type
                    localStorage.value[key] = newValue;
                },
            }),
        ]),
    ) as {
        [K in keyof typeof prefs]: WritableComputedRef<
            (typeof prefs)[K]["options"]["defaultValue"]
        >;
    };
};

export const preferences = usePreferences();
