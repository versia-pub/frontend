import { Client, type Token } from "@versia/client";

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
                    useEvent("notification:new", {
                        title: "An error occured",
                        type: "error",
                        description:
                            error.response.data.error ??
                            "No error message provided",
                    });
                },
            ),
    );
};

export const client = useClient();
