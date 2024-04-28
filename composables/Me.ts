import { StorageSerializers } from "@vueuse/core";
import type { Account } from "~/types/mastodon/account";

export const useMe = () => {
    return useLocalStorage<Account | null>("lysand:me", null, {
        serializer: StorageSerializers.object,
    });
};
