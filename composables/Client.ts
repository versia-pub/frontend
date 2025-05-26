import { Client } from "@versia/client";
import type { Token } from "@versia/client/schemas";
import { toast } from "vue-sonner";
import type { z } from "zod";

export const useClient = (
    origin?: MaybeRef<URL>,
    customToken: MaybeRef<z.infer<typeof Token> | null> = null,
): Ref<Client> => {
    const apiHost = window.location.origin;
    const domain = identity.value?.instance.domain;

    return ref(
        new Client(
            toValue(origin) ??
                (domain ? new URL(`https://${domain}`) : new URL(apiHost)),
            toValue(customToken)?.access_token ??
                identity.value?.tokens.access_token ??
                undefined,
            {
                globalCatch: (error) => {
                    toast.error(
                        error.response.data.error ??
                            "No error message provided",
                    );
                },
                throwOnError: false,
            },
        ),
    ) as Ref<Client>;
};

export const client = useClient();
