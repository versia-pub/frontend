import type { CredentialApplication } from "@versia/client/schemas";
import { nanoid } from "nanoid";
import { toast } from "vue-sonner";
import type { z } from "zod";
import { confirmModalService } from "~/components/modals/composable";
import pkg from "~/package.json";
import * as m from "~/paraglide/messages.js";

const getRedirectUri = () => new URL("/", useRequestURL().origin);

export const askForInstance = async (): Promise<URL> => {
    const { confirmed, value } = await confirmModalService.confirm({
        title: m.sharp_alive_anteater_fade(),
        inputType: "url",
        message: m.noble_misty_rook_slide(),
    });

    if (confirmed && value) {
        return new URL(URL.canParse(value) ? value : `https://${value}`);
    }

    throw new Error("No instance provided");
};

export const signIn = async (
    appData: Ref<z.infer<typeof CredentialApplication> | null>,
    origin: URL,
) => {
    const id = toast.loading(m.level_due_ox_greet());

    const client = useClient(origin);

    const redirectUri = getRedirectUri();

    redirectUri.searchParams.append("origin", origin.toString());

    const output = await client.value.createApp("Versia-FE", {
        scopes: ["read", "write", "follow", "push"],
        redirect_uris: redirectUri.toString(),
        // @ts-expect-error Package.json types are missing this field
        website: pkg.homepage ?? undefined,
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
    appData: z.infer<typeof CredentialApplication>,
    origin: URL,
) => {
    const client = useClient(origin);
    const redirectUri = getRedirectUri();

    redirectUri.searchParams.append("origin", origin.toString());

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

export const signOut = async (
    appData: z.infer<typeof CredentialApplication> | null,
    identityToRevoke: Identity,
) => {
    const id = toast.loading("Signing out...");

    if (!appData) {
        toast.dismiss(id);
        toast.error("No app or identity data to sign out");
        return;
    }

    // Don't do anything on error, as Versia Server doesn't implement the revoke endpoint yet
    await client.value
        ?.revokeToken(
            appData.client_id,
            identityToRevoke.tokens.access_token,
            identityToRevoke.tokens.access_token,
        )
        .catch(() => {
            // Do nothing
        });

    identities.value = identities.value.filter(
        (i) => i.id !== identityToRevoke.id,
    );
    toast.dismiss(id);
    toast.success("Signed out");
};
