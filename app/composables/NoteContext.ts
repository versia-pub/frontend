import type { Context } from "@versia/client/schemas";
import type { z } from "zod";

export const useNoteContext = (noteId: MaybeRef<string | null>) => {
    const authStore = useAuthStore();

    const output = ref(null as z.infer<typeof Context> | null);

    watchEffect(() => {
        if (toValue(noteId)) {
            authStore.client
                .getStatusContext(toValue(noteId) ?? "")
                .then((res) => {
                    output.value = res.data;
                });
        }
    });

    return output;
};
