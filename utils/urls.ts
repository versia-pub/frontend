export const wrapUrl = (path: string) => {
    return new URL(
        path,
        identity.value
            ? `https://${identity.value.instance.domain}`
            : window.location.origin,
    ).toString();
};
