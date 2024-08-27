import type { ApplicationData } from "@versia/client/types";
import { nanoid } from "nanoid";

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
