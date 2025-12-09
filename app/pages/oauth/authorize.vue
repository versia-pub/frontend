<script setup lang="ts">
import { Client } from "@versia/client";
import { AlertCircle, Loader } from "lucide-vue-next";
import { NuxtLink } from "#components";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import * as m from "~~/paraglide/messages.js";

useHead({
    title: m.fuzzy_sea_moth_absorb(),
});

const baseUrl = useRequestURL();
const client = computed(() => new Client(baseUrl));
const instance = useInstanceFromClient(client);
const {
    error,
    error_description,
    redirect_uri,
    response_type,
    client_id,
    scope,
} = useUrlSearchParams();

const hasValidUrlSearchParams =
    redirect_uri && response_type && client_id && scope;

const isLoading = ref(false);
const getProviderUrl = (providerId: string) =>
    new URL(`/oauth/sso/${providerId}`, baseUrl).toString();
</script>

<template>
    <div
        class="container relative flex h-svh flex-col items-center justify-center md:flex-row lg:max-w-none lg:px-0"
    >
        <Button
            :as="NuxtLink"
            href="/register"
            variant="link"
            class="absolute right-4 top-4 md:right-8 md:top-8"
        >
            {{ m.noble_cute_ocelot_aim() }}
        </Button>
        <div
            class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex grow bg-center bg-no-repeat bg-cover"
            :style="{
                backgroundImage: 'url(/images/banner.webp)',
            }"
        >
            <div
                class="absolute top-0 left-0 w-full h-72 bg-linear-to-t from-transparent to-black/70"
            />
            <div class="relative z-20 flex items-center text-lg font-medium">
                <img
                    crossorigin="anonymous"
                    :src="
                        instance?.thumbnail?.url ||
                        'https://cdn.versia.pub/branding/icon.svg'
                    "
                    alt="Versia logo"
                    class="size-10 mr-4"
                >
                {{ instance?.title }}
            </div>
        </div>
        <div class="lg:p-8 w-full max-w-xl">
            <div
                class="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[350px]"
            >
                <Alert v-if="error" variant="destructive" class="mb-4">
                    <AlertCircle class="size-4"/>
                    <AlertTitle>{{ error }}</AlertTitle>
                    <AlertDescription>{{ error_description }}</AlertDescription>
                </Alert>
                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="text-2xl font-semibold tracking-tight">
                        {{ m.novel_fine_stork_snap() }}
                    </h1>
                    <p
                        class="text-sm text-muted-foreground"
                        v-html="
                            m.smug_main_whale_snip({
                                host: baseUrl.host,
                            })
                        "
                    ></p>
                </div>
                <div
                    v-if="instance && hasValidUrlSearchParams"
                    class="grid gap-6"
                >
                    <div
                        v-if="instance.sso.providers.length > 0"
                        class="flex flex-col gap-2"
                    >
                        <form
                            v-for="provider of instance.sso.providers"
                            :key="provider.id"
                            method="POST"
                            :action="getProviderUrl(provider.id)"
                        >
                            <input
                                type="hidden"
                                name="redirect_uri"
                                :value="redirect_uri"
                            >
                            <input
                                type="hidden"
                                name="client_id"
                                :value="client_id"
                            >
                            <input
                                v-for="(scopePart, index) of (scope as string).split(' ')"
                                type="hidden"
                                :name="`scope[${index}]`"
                                :value="scopePart"
                            >
                            <Button
                                variant="outline"
                                type="submit"
                                :disabled="isLoading"
                                class="w-full"
                            >
                                <Loader
                                    v-if="isLoading"
                                    class="mr-2 animate-spin"
                                />
                                <img
                                    crossorigin="anonymous"
                                    :src="provider.icon"
                                    :alt="`${provider.name}'s logo`"
                                    class="size-4 mr-2"
                                >
                                {{ provider.name }}
                            </Button>
                        </form>
                    </div>
                    <Alert v-else variant="destructive" class="mb-4">
                        <AlertCircle class="size-4"/>
                        <AlertTitle>
                            No SSO providers are configured.
                        </AlertTitle>
                        <AlertDescription>
                            <p>
                                Please ask the administrator of
                                {{ instance.domain }}to set up SSO providers.
                            </p>
                        </AlertDescription>
                    </Alert>
                </div>
                <div
                    v-else-if="hasValidUrlSearchParams"
                    class="p-4 flex items-center justify-center h-48"
                >
                    <Loader class="size-8 animate-spin"/>
                </div>
                <Alert v-else variant="destructive" class="mb-4">
                    <AlertCircle class="size-4"/>
                    <AlertTitle>
                        {{
                        m.grand_spry_goldfish_embrace()
                    }}
                    </AlertTitle>
                    <AlertDescription>
                        <p>{{ m.gray_clean_shark_comfort() }}</p>
                        <ul class="list-disc list-inside mt-2 font-mono">
                            <li>redirect_uri</li>
                            <li>response_type</li>
                            <li>client_id</li>
                            <li>scope</li>
                        </ul>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    </div>
</template>
