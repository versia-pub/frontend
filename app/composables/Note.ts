import type { Status } from "@versia/client/schemas";
import type { z } from "zod";

export const useNote = (noteId: MaybeRef<string | null>) => {
    if (!toValue(noteId)) {
        return ref(null as z.infer<typeof Status> | null);
    }

    const authStore = useAuthStore();

    const output = ref(null as z.infer<typeof Status> | null);

    watchEffect(() => {
        toValue(noteId) &&
            authStore.client
                .getStatus(toValue(noteId) as string)
                .then((res) => {
                    output.value = res.data;
                });
    });

    return output;
};
