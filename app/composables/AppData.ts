import type { CredentialApplication } from "@versia/client/schemas";
import { StorageSerializers } from "@vueuse/core";
import type { z } from "zod";

export const useAppData = () => {
    return useLocalStorage<z.infer<typeof CredentialApplication> | null>(
        "versia:app_data",
        null,
        {
            serializer: StorageSerializers.object,
        },
    );
};
