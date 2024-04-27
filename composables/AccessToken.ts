import { StorageSerializers } from "@vueuse/core";
import type { OAuth } from "megalodon";

export const useTokenData = () => {
    return useLocalStorage<OAuth.TokenData | null>("lysand:token_data", null, {
        serializer: StorageSerializers.object,
    });
};
