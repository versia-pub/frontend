import { Client, type Token } from "@versia/client";
import { toast } from "vue-sonner";

export const useClient = (
    origin?: MaybeRef<URL>,
    customToken: MaybeRef<Token | null> = null,
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
            (error) => {
                toast.error(
                    error.response.data.error ?? "No error message provided",
                );
            },
        ),
    ) as Ref<Client>;
};

export const client = useClient();
