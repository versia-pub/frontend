<template>
    <div v-if="loading" class="fixed inset-0 bg-black z-[500] flex items-center justify-center">
        <!-- Progress bar stuck to top -->
        <div class="fixed top-0 left-0 right-0 h-1.5 bg-primary-500" :style="{ width: `${progress}%` }"></div>
        <div class="flex flex-col items-center justify-center gap-8">
            <img src="/logo.webp" class="size-20 animate-pulse" role="presentation" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const loading = ref(true);
const oidcError = useRequestURL().searchParams.get(
    "oidc_account_linking_error",
);
const oidcErrorDesc = useRequestURL().searchParams.get(
    "oidc_account_linking_error_message",
);
const oidcAccountLinked = useRequestURL().searchParams.get(
    "oidc_account_linked",
);

const estimatedProgress = (duration: number, elapsed: number) =>
    (2 / Math.PI) * 100 * Math.atan(((elapsed / duration) * 100) / 50);

const progress = ref(0);
const timeAtStart = performance.now();
const app = useNuxtApp();

const duration = 3000;

useIntervalFn(() => {
    const elapsed = performance.now() - timeAtStart;
    progress.value = estimatedProgress(duration, elapsed);
}, 1000 / 60);

app.hook("page:finish", async () => {
    // Wait until page has loaded for at least 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loading.value = false;

    if (oidcError) {
        useEvent("notification:new", {
            type: "error",
            title: oidcError,
            message: oidcErrorDesc ?? undefined,
            persistent: true,
            onDismiss: () => {
                // Remove data from URL
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname,
                );
            },
        });

        // Remove the error from the URL
    }

    if (oidcAccountLinked) {
        useEvent("notification:new", {
            type: "success",
            title: "Account linked",
            message:
                "Your account has been successfully linked to your OpenID Connect provider.",
            persistent: true,
            onDismiss: () => {
                // Remove data from URL
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname,
                );
            },
        });
    }
});
</script>