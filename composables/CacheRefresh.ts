import type { Mastodon } from "megalodon";
import type { InstanceWithExtra } from "./Instance";

export const useCacheRefresh = (client: MaybeRef<Mastodon | null>) => {
    const tokenData = useTokenData();
    const me = useMe();
    const instance = useInstance();
    const customEmojis = useCustomEmojis();

    // Refresh custom emojis and instance data and me on every reload
    watchEffect(async () => {
        if (tokenData.value) {
            await toValue(client)
                ?.verifyAccountCredentials()
                .then((res) => {
                    me.value = res.data;
                });
        }

        toValue(client)
            ?.getInstanceCustomEmojis()
            .then((res) => {
                customEmojis.value = res.data;
            });

        toValue(client)
            ?.getInstance()
            .then((res) => {
                instance.value = res.data as InstanceWithExtra;
            });
    });
};
