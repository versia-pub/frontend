import type { ApplicationData } from "@versia/client/types";
import { nanoid } from "nanoid";
import { toast } from "vue-sonner";

export const signIn = async (appData: Ref<ApplicationData | null>) => {
    const id = toast.loading("Signing in...");

    const output = await client.value.createApp("Versia", {
        scopes: ["read", "write", "follow", "push"],
        redirect_uris: new URL("/", useRequestURL().origin).toString(),
        website: useBaseUrl().value,
    });

    if (!output?.data) {
        toast.dismiss(id);
        toast.error("Failed to create app");
        return;
    }

    appData.value = output.data;

    const url = await client.value.generateAuthUrl(
        output.data.client_id,
        output.data.client_secret,
        {
            scopes: ["read", "write", "follow", "push"],
            redirect_uri: new URL("/", useRequestURL().origin).toString(),
        },
    );

    if (!url) {
        toast.dismiss(id);
        toast.error("Failed to generate auth URL");
        return;
    }

    window.location.href = url;
};

export const signInWithCode = (code: string, appData: ApplicationData) => {
    client.value
        ?.fetchAccessToken(
            appData.client_id,
            appData.client_secret,
            code,
            new URL("/", useRequestURL().origin).toString(),
        )
        .then(async (res) => {
            const tempClient = useClient(res.data).value;

            const [accountOutput, instanceOutput] = await Promise.all([
                tempClient.verifyAccountCredentials(),
                tempClient.getInstance(),
            ]);

            // Get account data
            if (
                !identities.value.find(
                    (i) => i.account.id === accountOutput.data.id,
                )
            ) {
                identity.value = {
                    id: nanoid(),
                    tokens: res.data,
                    account: accountOutput.data,
                    instance: instanceOutput.data,
                    permissions: [],
                    emojis: [],
                };
            }

            // Remove code from URL
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname,
            );

            // Redirect to home
            window.location.pathname = "/";
        });
};
