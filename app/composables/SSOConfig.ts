import type { Instance } from "@versia/client/schemas";
import type { z } from "zod";

export const useSSOConfig = (): Ref<z.infer<
    typeof Instance.shape.sso
> | null> => {
    const instance = useInstance();

    return computed(() => instance.value?.sso || null);
};
