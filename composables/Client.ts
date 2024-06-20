import { LysandClient, type Token } from "@lysand-org/client";
import { useCurrentIdentity } from "./Identities";

export const useClient = (
    customToken: MaybeRef<Token | null> = null,
): Ref<LysandClient> => {
    const identity = useCurrentIdentity();

    return computed(
        () =>
            new LysandClient(
                new URL(useBaseUrl().value),
                toValue(customToken)?.access_token ??
                    identity.value?.tokens.access_token ??
                    undefined,
                (error) => {
                    useEvent("notification:new", {
                        title: "An error occured",
                        type: "error",
                        message:
                            error.response.data.error ??
                            "No error message provided",
                    });
                },
            ),
    );
};
