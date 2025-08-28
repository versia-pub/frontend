export const wrapUrl = (path: string) => {
    const authStore = useAuthStore();

    return new URL(
        path,
        authStore.instance
            ? `https://${authStore.instance.domain}`
            : window.location.origin,
    ).toString();
};
