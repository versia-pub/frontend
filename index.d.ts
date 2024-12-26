import type { JSX } from "vue/jsx-runtime";

declare module "#app" {
    interface PageMeta {
        breadcrumbs?: () => {
            text: string;
            href?: string;
            list?: {
                text: string;
                href: string;
            }[];
        }[];
        header?: JSX.Element;
        requiresAuth?: boolean;
    }
}
