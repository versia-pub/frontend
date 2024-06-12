import type { LysandClient, Token } from "@lysand-org/client";
import { StorageSerializers } from "@vueuse/core";
import type { Account } from "~/types/mastodon/account";
import type { Instance } from "./Instance";

export type Role = Awaited<ReturnType<LysandClient["getRole"]>>["data"];
export enum RolePermissions {
    MANAGE_NOTES = "notes",
    MANAGE_OWN_NOTES = "owner:note",
    VIEW_NOTES = "read:note",
    VIEW_NOTE_LIKES = "read:note_likes",
    VIEW_NOTE_BOOSTS = "read:note_boosts",
    MANAGE_ACCOUNTS = "accounts",
    MANAGE_OWN_ACCOUNT = "owner:account",
    VIEW_ACCOUNT_FOLLOWS = "read:account_follows",
    MANAGE_LIKES = "likes",
    MANAGE_OWN_LIKES = "owner:like",
    MANAGE_BOOSTS = "boosts",
    MANAGE_OWN_BOOSTS = "owner:boost",
    VIEW_ACCOUNTS = "read:account",
    MANAGE_EMOJIS = "emojis",
    VIEW_EMOJIS = "read:emoji",
    MANAGE_OWN_EMOJIS = "owner:emoji",
    MANAGE_MEDIA = "media",
    MANAGE_OWN_MEDIA = "owner:media",
    MANAGE_BLOCKS = "blocks",
    MANAGE_OWN_BLOCKS = "owner:block",
    MANAGE_FILTERS = "filters",
    MANAGE_OWN_FILTERS = "owner:filter",
    MANAGE_MUTES = "mutes",
    MANAGE_OWN_MUTES = "owner:mute",
    MANAGE_REPORTS = "reports",
    MANAGE_OWN_REPORTS = "owner:report",
    MANAGE_SETTINGS = "settings",
    MANAGE_OWN_SETTINGS = "owner:settings",
    MANAGE_ROLES = "roles",
    MANAGE_NOTIFICATIONS = "notifications",
    MANAGE_OWN_NOTIFICATIONS = "owner:notification",
    MANAGE_FOLLOWS = "follows",
    MANAGE_OWN_FOLLOWS = "owner:follow",
    MANAGE_OWN_APPS = "owner:app",
    SEARCH = "search",
    VIEW_PUBLIC_TIMELINES = "public_timelines",
    VIEW_PRIVATE_TIMELINES = "private_timelines",
    IGNORE_RATE_LIMITS = "ignore_rate_limits",
    IMPERSONATE = "impersonate",
    MANAGE_INSTANCE = "instance",
    MANAGE_INSTANCE_FEDERATION = "instance:federation",
    MANAGE_INSTANCE_SETTINGS = "instance:settings",
    OAUTH = "oauth",
}
export type CustomEmoji = Awaited<
    ReturnType<LysandClient["getInstanceCustomEmojis"]>
>["data"][0];

export type Identity = {
    id: string;
    tokens: Token;
    account: Account;
    instance: Instance;
    permissions: RolePermissions[];
    emojis: CustomEmoji[];
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
                if (identities.value.find((i) => i.id === newCurrent.id))
                    identities.value = identities.value.map((i) =>
                        i.id === newCurrent.id ? newCurrent : i,
                    );
                // If the identity is not in the list, add it
                else identities.value.push(newCurrent);

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
