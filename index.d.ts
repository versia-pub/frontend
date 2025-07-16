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
        requiresAuth?: boolean;
    }
}

export {};
