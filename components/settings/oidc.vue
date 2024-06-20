<template>
    <!-- OIDC linked accounts manager -->
    <div class="w-full ring-1 ring-white/5 pb-5 bg-dark-800 rounded overflow-hidden">
        <div class="px-4 py-4">
            <h3 class="font-semibold text-gray-300 text-xl">Linked accounts</h3>
        </div>
        <div class="px-4 py-3">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                <div v-for="provider of ssoConfig?.providers" :key="provider.id"
                    class="flex items-center justify-between p-4 bg-dark-700 rounded">
                    <div class="flex items-center gap-4">
                        <AvatarsCentered :src="provider.icon" :alt="provider.name" class="h-8 w-8" />
                        <span class="font-semibold text-gray-300">{{ provider.name }}</span>
                    </div>
                    <div>
                        <ButtonsPrimary :loading="loading" v-if="!linkedProviders?.find(p => p.id === provider.id)"
                            @click="link(provider.id)">
                            <span>Link</span>
                        </ButtonsPrimary>
                        <ButtonsSecondary :loading="loading" v-else @click="unlink(provider.id)">
                            <span>Unlink</span>
                        </ButtonsSecondary>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ResponseError } from "@lysand-org/client";

const client = useClient();
const ssoConfig = useSSOConfig();
const linkedProviders = useLinkedSSO(client);
const loading = ref(false);

const link = async (providerId: string) => {
    loading.value = true;

    try {
        const output = await client.value.post<{
            link: string;
        }>("/api/v1/sso", {
            issuer: providerId,
        });

        window.location.href = output.data.link;
    } catch (error) {
        const e = error as ResponseError<{ error: string }>;

        useEvent("notification:new", {
            title: "Failed to link account",
            description: e.response.data.error,
            type: "error",
        });
    }

    loading.value = false;
};

const unlink = async (providerId: string) => {
    loading.value = true;

    try {
        await client.value.delete<void>(`/api/v1/sso/${providerId}`);

        useEvent("notification:new", {
            title: "Account unlinked",
            type: "success",
        });

        linkedProviders.value = linkedProviders.value.filter(
            (p) => p.id !== providerId,
        );
    } catch (error) {
        const e = error as ResponseError<{ error: string }>;

        useEvent("notification:new", {
            title: "Failed to unlink account",
            description: e.response.data.error,
            type: "error",
        });
    }

    loading.value = false;
};
</script>
