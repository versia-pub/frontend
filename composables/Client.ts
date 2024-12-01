import { Client, type Token } from "@versia/client";
import { toast } from "vue-sonner";

export const useClient = (
    customToken: MaybeRef<Token | null> = null,
): Ref<Client> => {
    return computed(
        () =>
            new Client(
                new URL(useBaseUrl().value),
                toValue(customToken)?.access_token ??
                    identity.value?.tokens.access_token ??
                    undefined,
                (error) => {
                    toast.error(
                        error.response.data.error ??
                            "No error message provided",
                    );
                },
            ),
    );
};

export const client = useClient();
