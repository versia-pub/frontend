import type { LysandClient } from "@lysand-org/client";
import { StorageSerializers } from "@vueuse/core";

export type ApplicationData = Awaited<
    ReturnType<LysandClient["createApp"]>
>["data"];

export const useAppData = () => {
    return useLocalStorage<ApplicationData | null>("lysand:app_data", null, {
        serializer: StorageSerializers.object,
    });
};
