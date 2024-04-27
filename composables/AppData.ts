import { StorageSerializers } from "@vueuse/core";
import type { OAuth } from "megalodon";

export const useAppData = () => {
    return useLocalStorage<OAuth.AppData | null>("lysand:app_data", null, {
        serializer: StorageSerializers.object,
    });
};
