import type { ApplicationData } from "@versia/client/types";
import { StorageSerializers } from "@vueuse/core";

export const useAppData = () => {
    return useLocalStorage<ApplicationData | null>("versia:app_data", null, {
        serializer: StorageSerializers.object,
    });
};
