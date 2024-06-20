import type { Token } from "@lysand-org/client";
import type {
    Account,
    Emoji,
    Instance,
    RolePermission,
} from "@lysand-org/client/types";
import { StorageSerializers } from "@vueuse/core";

export type Identity = {
    id: string;
    tokens: Token;
    account: Account;
    instance: Instance;
    permissions: RolePermission[];
    emojis: Emoji[];
};

export const useIdentities = (): Ref<Identity[]> => {
    return useLocalStorage<Identity[]>("lysand:identities", [], {
        serializer: StorageSerializers.object,
    });
};

export const useCurrentIdentity = (): Ref<Identity | null> => {
    const currentId = useLocalStorage<string | null>(
        "lysand:identities:current",
        null,
    );

    const identities = useIdentities();
    const current = ref(
        identities.value.find((i) => i.id === currentId.value) ?? null,
    );

    watch(identities, (ids) => {
        if (ids.length === 0) {
            current.value = null;
        }
    });

    watch(
        current,
        (newCurrent) => {
            if (newCurrent) {
                currentId.value = newCurrent.id;
                // If the identity is updated, update the identity in the list
                if (identities.value.find((i) => i.id === newCurrent.id)) {
                    identities.value = identities.value.map((i) =>
                        i.id === newCurrent.id ? newCurrent : i,
                    );
                }
                // If the identity is not in the list, add it
                else {
                    identities.value.push(newCurrent);
                }

                // Force update the identities
                identities.value = [...identities.value];
            } else {
                identities.value = identities.value.filter(
                    (i) => i.id !== currentId.value,
                );

                if (identities.value.length > 0) {
                    currentId.value = identities.value[0]?.id;
                } else {
                    currentId.value = null;
                }
            }
        },
        { deep: true },
    );

    return current;
};
