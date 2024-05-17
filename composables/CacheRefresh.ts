import type { Mastodon } from "megalodon";
import type { InstanceWithExtra } from "./Instance";

export const useCacheRefresh = (client: MaybeRef<Mastodon | null>) => {
    if (process.server) return;

    const tokenData = useTokenData();
    const me = useMe();
    const instance = useInstance();
    const customEmojis = useCustomEmojis();

    // Refresh custom emojis and instance data and me on every reload
    watchEffect(async () => {
        console.log("Clearing cache");
        if (tokenData.value) {
            await toValue(client)
                ?.verifyAccountCredentials()
                .then((res) => {
                    me.value = res.data;
                })
                .catch((err) => {
                    const code = err.response.status;

                    if (code === 401) {
                        // Reset tokenData
                        tokenData.value = null;
                        useEvent("notification:new", {
                            type: "error",
                            title: "Your session has expired",
                            message:
                                "You have been logged out. Please log in again.",
                        });
                    }
                });

            await toValue(client)
                ?.getInstanceCustomEmojis()
                .then((res) => {
                    customEmojis.value = res.data;
                });
        }

        toValue(client)
            ?.getInstance()
            .then((res) => {
                instance.value = res.data as InstanceWithExtra;
            });
    });
};
