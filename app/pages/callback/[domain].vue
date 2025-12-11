<template>
    <Card v-if="code && domain" class="w-full max-w-md *:w-full">
        <CardHeader>
            <CardTitle>Signing in...</CardTitle>
            <CardDescription>You will be redirected shortly.</CardDescription>
        </CardHeader>
    </Card>
    <Card v-else class="w-full max-w-md *:w-full">
        <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
                Missing code or domain in the callback URL.
            </CardDescription>
        </CardHeader>
    </Card>
</template>

<script lang="ts" setup>
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

// This page handles the OAuth callback and signs the user in
definePageMeta({
    layout: "auth",
});

const code = useRequestURL().searchParams.get("code");
const domain = useRoute().params.domain as string;
const authStore = useAuthStore();

if (code && domain) {
    const newOrigin = new URL(`https://${domain}`);

    await authStore.finishSignIn(code, newOrigin);
    await navigateTo("/", {
        external: true,
    });
}
</script>
