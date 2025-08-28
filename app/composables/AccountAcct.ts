import type { Account } from "@versia/client/schemas";
import type { z } from "zod";

export const useAccountFromAcct = (
    acct: string,
): {
    account: Ref<z.infer<typeof Account> | null>;
    isLoading: Ref<boolean>;
} => {
    const output = ref(null as z.infer<typeof Account> | null);
    const isLoading = ref(true);
    const authStore = useAuthStore();

    authStore.client.lookupAccount(acct).then((res) => {
        isLoading.value = false;
        output.value = res.data;
    });

    return { account: output, isLoading };
};
