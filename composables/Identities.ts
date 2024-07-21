import type { Token } from "@lysand-org/client";
import type {
    Account,
    Emoji,
    Instance,
    RolePermission,
} from "@lysand-org/client/types";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { ref, watch } from "vue";

/**
 * Represents an identity with associated tokens, account, instance, permissions, and emojis.
 */
export interface Identity {
    id: string;
    tokens: Token;
    account: Account;
    instance: Instance;
    permissions: RolePermission[];
    emojis: Emoji[];
}

/**
 * Composable to manage multiple identities.
 * @returns A reactive reference to an array of identities.
 */
function useIdentities(): Ref<Identity[]> {
    return useLocalStorage<Identity[]>("lysand:identities", [], {
        serializer: StorageSerializers.object,
    });
}

export const identities = useIdentities();

const currentId = useLocalStorage<string | null>(
    "lysand:identities:current",
    null,
);

const current = ref<Identity | null>(null);

/**
 * Composable to manage the current identity.
 * @returns A reactive reference to the current identity or null if not set.
 */
function useCurrentIdentity(): Ref<Identity | null> {
    // Initialize current identity
    function updateCurrentIdentity() {
        current.value =
            identities.value.find((i) => i.id === currentId.value) ?? null;
    }

    // Watch for changes in identities
    watch(
        identities,
        (ids) => {
            if (ids.length === 0) {
                current.value = null;
                currentId.value = null;
            } else {
                updateCurrentIdentity();
            }
        },
        { deep: true },
    );

    // Watch for changes in currentId
    watch(currentId, updateCurrentIdentity);

    // Watch for changes in current identity
    watch(
        current,
        (newCurrent) => {
            if (newCurrent) {
                currentId.value = newCurrent.id;
                const index = identities.value.findIndex(
                    (i) => i.id === newCurrent.id,
                );
                if (index !== -1) {
                    // Update existing identity
                    identities.value[index] = newCurrent;
                } else {
                    // Add new identity
                    identities.value.push(newCurrent);
                }
            } else {
                // Remove current identity
                identities.value = identities.value.filter(
                    (i) => i.id !== currentId.value,
                );
                currentId.value = identities.value[0]?.id ?? null;
            }
        },
        { deep: true },
    );

    // Initial setup
    updateCurrentIdentity();

    return current;
}

export const identity = useCurrentIdentity();
