<template>
    <div class="flex min-h-screen relative flex-col gap-10 justify-center py-12 px-8">
        <img crossorigin="anonymous" src="https://cdn.lysand.org/logo.webp" alt="Lysand logo"
            class="mx-auto hidden md:inline-block h-20 ring-1 ring-white/20 rounded" />
        <div v-if="validUrlParameters" class="mx-auto w-full max-w-md">
            <VeeForm class="flex flex-col gap-y-6" method="POST" :validation-schema="schema"
                :action="`/api/auth/login?redirect_uri=${params.redirect_uri}&response_type=${params.response_type}&client_id=${params.client_id}&scope=${params.scope}`">
                <h1 class="font-bold text-2xl text-gray-50 text-center tracking-tight">Login to your account</h1>

                <div v-if="params.error" class="ring-1 ring-white/10 rounded p-4 bg-red-500 text-white">
                    <h2 class="font-bold text-lg">An error occured</h2>
                    <span class="text-sm">{{ params.error_description }}</span>
                </div>

                <VeeField name="identifier" as="div" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <InputsLabelAndError>
                            <InputsLabel for="identifier">Username or Email</InputsLabel>
                            <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                        </InputsLabelAndError>
                        <InputsText id="identifier" placeholder="joemama" autocomplete="email username" required
                            v-bind="field" :is-invalid="!!errorMessage" />
                    </InputsField>
                </VeeField>

                <VeeField name="password" as="div" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <InputsLabelAndError>
                            <InputsLabel for="password">Password</InputsLabel>
                            <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                        </InputsLabelAndError>
                        <InputsPassword id="password" placeholder="hunter2" autocomplete="current-password" required
                            v-bind="field" :is-invalid="!!errorMessage" />
                    </InputsField>
                </VeeField>

                <div v-if="ssoConfig && ssoConfig.providers.length > 0" class="w-full space-y-3">
                    <div
                        class="flex items-center text-center w-full after:border-b after:border-dark-200 after:flex-1 after:ml-2 before:border-b before:border-dark-200 before:flex-1 before:mr-2">
                        <h2 class="text-sm text-gray-200 font-semibold">Or sign in with</h2>
                    </div>
                    <div class="grid md:grid-cols-2 md:[&:has(>:last-child:nth-child(1))]:grid-cols-1 gap-4 w-full">
                        <a v-for="provider of ssoConfig.providers" :key="provider.id"
                            :href="`/oauth/sso?issuer=${provider.id}&redirect_uri=${params.redirect_uri}&response_type=${params.response_type}&client_id=${params.client_id}&scope=${params.scope}`">
                            <ButtonsSecondary class="flex flex-row w-full items-center justify-center gap-3">
                                <img crossorigin="anonymous" :src="provider.icon" :alt="`${provider.name}'s logo'`"
                                    class="w-6 h-6" />
                                <div class="flex flex-col gap-0 justify-center">
                                    <h3 class="font-bold">{{ provider.name }}</h3>
                                </div>
                            </ButtonsSecondary>
                        </a>
                    </div>
                </div>

                <p class="text-xs text-gray-300">
                    You are signing in to <strong>{{ hostname }}</strong>. If you did not intend to sign in
                    here, please close this page.
                </p>

                <ButtonsPrimary type="submit" class="w-full">Sign in</ButtonsPrimary>
            </VeeForm>
        </div>
        <div v-else class="mx-auto max-w-md">
            <h1 class="text-2xl font-bold tracking-tight text-gray-50 sm:text-4xl">Invalid access
                parameters
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-300">This page should be accessed
                through a valid OAuth2 authorization request. Please use a <strong class="font-bold">Mastodon
                    API</strong> client to access this page.
            </p>
            <p class="mt-6 text-lg leading-8 text-gray-300">Here are some recommended clients:</p>
            <ul class="w-full flex flex-col gap-3 mt-4">
                <li v-for="client of useConfig().RECOMMENDED_CLIENTS" :key="client.name" class="w-full">
                    <a :href="client.link" target="_blank"
                        class="rounded-sm ring-2 ring-white/10 px-4 py-2 w-full flex flex-row gap-3 items-center">
                        <img crossorigin="anonymous" :src="client.icon" :alt="`${client.name}'s logo'`"
                            class="h-10 w-10" />
                        <div class="flex flex-col justify-between items-start">
                            <h2 class="font-bold text-gray-100">{{ client.name }}</h2>
                            <span class="underline text-primary-700">{{ client.link }}</span>
                        </div>
                    </a>
                </li>
            </ul>
            <p class="mt-6 text-lg leading-8 text-gray-300">
                Many other clients exist, but <strong class="font-bold">they have not been tested for
                    compatibility</strong>. Bug reports are nevertheless welcome.
            </p>

            <p class="mt-6 text-lg leading-8 text-gray-300">
                Found a problem? Report it on <a href="https://github.com/lysand-org/lysand/issues/new/choose"
                    target="_blank" class="underline text-primary-700">the issue tracker</a>.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const schema = toTypedSchema(
    z.object({
        identifier: z.string().min(3).or(z.string().email()),
        password: z.string().min(3),
    }),
);

const hostname = useRequestURL().hostname;
const params = useUrlSearchParams();

const validUrlParameters =
    params.redirect_uri &&
    params.response_type &&
    params.client_id &&
    params.scope;

const ssoConfig = useSSOConfig();
</script>