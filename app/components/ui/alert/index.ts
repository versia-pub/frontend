import { cva, type VariantProps } from "class-variance-authority";

export { default as Alert } from "./Alert.vue";
export { default as AlertDescription } from "./AlertDescription.vue";
export { default as AlertTitle } from "./AlertTitle.vue";

export const alertVariants = cva(
    "relative w-full rounded-lg border px-4 py-3 grid text-sm [&>svg]:size-4 [&>svg]:text-current",
    {
        variants: {
            variant: {
                default: "bg-card text-card-foreground",
                destructive:
                    "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
            },
            layout: {
                default:
                    "has-[>svg]:grid-cols-[1fr_auto] grid-rows-2 gap-x-3 gap-y-1 items-start",
                button: "grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-0.5 *:data-[slot=alert-description]:col-start-2 *:data-[slot=alert-description]:row-start-2 has-[>[data-slot=alert-description]]:[&>button]:row-span-2",
            },
        },
        defaultVariants: {
            variant: "default",
            layout: "default",
        },
    },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
