import type { Mastodon } from "megalodon";
import type { Relationship } from "~/types/mastodon/relationship";

export const useRelationship = (
    client: MaybeRef<Mastodon | null>,
    accountId: MaybeRef<string | null>,
) => {
    const relationship = ref(null as Relationship | null);
    const isLoading = ref(false);

    if (!useSignedIn().value) {
        return { relationship, isLoading };
    }

    watchEffect(() => {
        if (toValue(accountId))
            toValue(client)
                ?.getRelationship(toValue(accountId) ?? "")
                .then((res) => {
                    relationship.value = res.data;
                });
    });

    watch(relationship, (newOutput, oldOutput) => {
        if (newOutput !== oldOutput && newOutput && oldOutput) {
            if (newOutput?.following !== oldOutput?.following) {
                isLoading.value = true;
                if (newOutput?.following) {
                    toValue(client)
                        ?.followAccount(toValue(accountId) ?? "")
                        .finally(() => {
                            isLoading.value = false;
                        });
                } else {
                    toValue(client)
                        ?.unfollowAccount(toValue(accountId) ?? "")
                        .finally(() => {
                            isLoading.value = false;
                        });
                }
            }
            // FIXME: Add more relationship changes
        }
    });

    return { relationship, isLoading };
};
