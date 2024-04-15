export const useConfig = async () => {
    let host = useRequestHeader("X-Forwarded-Host") ?? useRuntimeConfig().public.apiHost;

    if (!host?.includes("http")) {
        // On server, this will be some kind of localhost
        host = `http://${host}`;
    }

    if (!host) {
        throw createError({
            statusCode: 500,
            statusMessage: "No X-Forwarded-Host header found",
        });
    }

    return await fetch(new URL("/api/_fe/config", host)).then((res) =>
        res.json(),
    );
};
