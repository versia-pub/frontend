import { toast } from "vue-sonner";
import * as m from "~~/paraglide/messages.js";

export const useCacheRefresh = () => {
    const authStore = useAuthStore();
    const { identityOptional } = storeToRefs(authStore);

    authStore.client.getInstance().then((res) => {
        authStore.updateActiveIdentity({
            instance: res.data,
        });
    });

    // Refresh custom emojis and instance data and me on every reload
    watch(
        identityOptional,
        async (oldIdentity, newIdentity) => {
            if (newIdentity && newIdentity.id !== oldIdentity?.id) {
                console.info("Refreshing emoji, instance and account cache");
                authStore.client
                    .verifyAccountCredentials()
                    .then((res) => {
                        authStore.updateActiveIdentity({
                            account: res.data,
                        });
                    })
                    .catch((err) => {
                        const code = err.response.status;

                        if (code === 401) {
                            // Reset tokenData
                            authStore.setActiveIdentity(null);
                            toast.error(m.fancy_this_wasp_renew(), {
                                description: m.real_weird_deer_stop(),
                            });
                        }
                    });

                authStore.client.getInstanceCustomEmojis().then((res) => {
                    authStore.updateActiveIdentity({
                        emojis: res.data,
                    });
                });
            }
        },
        { flush: "sync", immediate: true },
    );
};
