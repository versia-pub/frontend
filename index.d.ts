declare module "#app" {
    interface PageMeta {
        breadcrumbs?: () => {
            text: string;
            href?: string;
        }[];
        requiresAuth?: boolean;
    }
}

// It is always important to import/export something when augmenting a type
export {};
