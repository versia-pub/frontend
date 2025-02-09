import { type VariantProps, cva } from "class-variance-authority";

export { default as Alert } from "./Alert.vue";
export { default as AlertDescription } from "./AlertDescription.vue";
export { default as AlertTitle } from "./AlertTitle.vue";

export const alertVariants = cva(
    "relative w-full rounded border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
                warning:
                    "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
