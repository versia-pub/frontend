import type { ExtendedDescription } from "@versia/client/schemas";
import type { z } from "zod";

export const useExtendedDescription = () => {
    const store = useAuthStore();

    const output = ref(null as z.infer<typeof ExtendedDescription> | null);

    store.client.getInstanceExtendedDescription().then((res) => {
        output.value = res.data;
    });

    return output;
};
