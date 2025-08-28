import type { Relationship } from "@versia/client/schemas";
import type { z } from "zod";

export const useRelationship = (accountId: MaybeRef<string | null>) => {
    const relationship = ref(null as z.infer<typeof Relationship> | null);
    const isLoading = ref(false);
    const authStore = useAuthStore();

    if (!authStore.isSignedIn) {
        return { relationship, isLoading };
    }

    watchEffect(() => {
        if (toValue(accountId)) {
            authStore.client
                .getRelationship(toValue(accountId) ?? "")
                .then((res) => {
                    relationship.value = res.data;
                });
        }
    });

    watch(relationship, (newOutput, oldOutput) => {
        if (newOutput !== oldOutput && newOutput && oldOutput) {
            if (newOutput?.following !== oldOutput?.following) {
                isLoading.value = true;
                if (newOutput?.following) {
                    authStore.client
                        .followAccount(toValue(accountId) ?? "")
                        .finally(() => {
                            isLoading.value = false;
                        });
                } else {
                    authStore.client
                        .unfollowAccount(toValue(accountId) ?? "")
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
