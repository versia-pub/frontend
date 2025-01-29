import type { Client } from "@versia/client";
import type { ApplicationData } from "@versia/client/types";
import { nanoid } from "nanoid";
import { toast } from "vue-sonner";
import * as m from "~/paraglide/messages.js";

export const signIn = async (
    appData: Ref<ApplicationData | null>,
    origin: URL,
) => {
    const id = toast.loading(m.level_due_ox_greet());

    const redirectUri = new URL("/", useRequestURL().origin);

    const client = useClient(origin);

    redirectUri.searchParams.append("origin", client.value.url.origin);

    const output = await client.value.createApp("Versia", {
        scopes: ["read", "write", "follow", "push"],
        redirect_uris: redirectUri.toString(),
        website: useBaseUrl().value,
    });

    if (!output?.data) {
        toast.dismiss(id);
        toast.error(m.silly_sour_fireant_fear());
        return;
    }

    appData.value = output.data;

    const url = await client.value.generateAuthUrl(
        output.data.client_id,
        output.data.client_secret,
        {
            scopes: ["read", "write", "follow", "push"],
            redirect_uri: redirectUri.toString(),
        },
    );

    if (!url) {
        toast.dismiss(id);
        toast.error(m.candid_frail_lion_value());
        return;
    }

    // Add "instance_switch_uri" parameter to URL
    const toRedirect = new URL(url);

    toRedirect.searchParams.append("instance_switch_uri", useRequestURL().href);

    window.location.href = toRedirect.toString();
};

export const signInWithCode = (
    code: string,
    appData: ApplicationData,
    origin: URL,
) => {
    const client = useClient(origin);
    const redirectUri = new URL("/", useRequestURL().origin);

    redirectUri.searchParams.append("origin", client.value.url.origin);

    client.value
        ?.fetchAccessToken(
            appData.client_id,
            appData.client_secret,
            code,
            redirectUri.toString(),
        )
        .then(async (res) => {
            const tempClient = useClient(origin, res.data).value;

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
