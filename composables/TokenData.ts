import type { Token } from "@lysand-org/client";
import { StorageSerializers } from "@vueuse/core";

export const useTokenData = () => {
    return useLocalStorage<Token | null>("lysand:token_data", null, {
        serializer: StorageSerializers.object,
    });
};
