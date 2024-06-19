import type { ApplicationData } from "@lysand-org/client/types";
import { StorageSerializers } from "@vueuse/core";

export const useAppData = () => {
    return useLocalStorage<ApplicationData | null>("lysand:app_data", null, {
        serializer: StorageSerializers.object,
    });
};
