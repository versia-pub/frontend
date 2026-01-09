import type { Status } from "@versia/client/schemas";
import type { InjectionKey } from "vue";
import type { z } from "zod";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const key = Symbol() as InjectionKey<{
    note: PartialBy<z.infer<typeof Status>, "reblog" | "quote">;
    isRemote: boolean;
    rebloggerNote?: z.infer<typeof Status>;
}>;
