<template>
    <ClientOnly>
        <div class="flex min-h-screen relative flex-col justify-center py-12 lg:px-8">
            <img src="https://camo.githubusercontent.com/353460d1fdb1667ec993159270dcece12c491fb38165460215a519ab93f4e554/68747470733a2f2f63646e2d7765622e63706c757370617463682e636f6d2f6c7973616e642e77656270"
                alt="Lysand logo" class="mx-auto h-24 hidden md:block" />
            <div v-if="validUrlParameters"
                class="mt-10 sm:mx-auto w-full sm:max-w-md md:bg-dark-900 px-10 py-10 rounded md:ring-1 md:ring-white/10">
                <VeeForm class="space-y-6" method="POST" :validation-schema="schema"
                    :action="`/api/auth/login?redirect_uri=${redirect_uri}&response_type=${response_type}&client_id=${client_id}&scope=${scope}`">

                    <h1 class="font-bold text-2xl text-gray-50 text-center tracking-tight">Login to your account</h1>

                    <VeeField name="email" as="div" v-slot="{ errors, field }" validate-on-change>
                        <LoginInput label="Email" placeholder="contact@cpluspatch.com" type="email" autocomplete="email"
                            required :is-invalid="errors.length > 0" v-bind="field" />
                        <VeeErrorMessage name="email" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                            {{ message }}
                        </VeeErrorMessage>
                    </VeeField>

                    <VeeField name="password" as="div" v-slot="{ errors, field }" validate-on-change>
                        <LoginInput label="Password" placeholder="Password here" type="password"
                            autocomplete="current-password" required :is-invalid="errors.length > 0" v-bind="field" />
                        <VeeErrorMessage name="password" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                            {{ message }}
                        </VeeErrorMessage>
                    </VeeField>

                    <div v-if="oauthProviders && oauthProviders.length > 0" class="w-full flex flex-col gap-3">
                        <h2 class="text-sm text-gray-200">Or sign in with</h2>
                        <div class="grid grid-cols-1 gap-4 w-full">
                            <a v-for="provider of oauthProviders" :key="provider.id"
                                :href="`/oauth/authorize-external?issuer=${provider.id}&redirect_uri=${redirect_uri}&response_type=${response_type}&clientId=${client_id}&scope=${scope}`">
                                <ButtonsSecondary class="flex flex-row w-full items-center justify-center gap-3">
                                    <img :src="provider.icon" :alt="provider.name" class="w-6 h-6" />
                                    <div class="flex flex-col gap-0 justify-center">
                                        <h3 class="font-bold">{{ provider.name }}</h3>
                                    </div>
                                </ButtonsSecondary>
                            </a>
                        </div>
                    </div>

                    <ButtonsPrimary type="submit" class="w-full">Sign in</ButtonsPrimary>
                </VeeForm>
            </div>
            <div v-else class="mx-auto max-w-md mt-10">
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
                            <img :src="client.icon" :alt="client.name" class="h-10 w-10" />
                            <div class="flex flex-col justify-between items-start">
                                <h2 class="font-bold text-gray-100">{{ client.name }}</h2>
                                <span class="underline text-pink-700">{{ client.link }}</span>
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
                        target="_blank" class="underline text-pink-700">the issue tracker</a>.
                </p>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import LoginInput from "../../components/LoginInput.vue";
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const schema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(3),
}));

const query = useRoute().query;

const redirect_uri = query.redirect_uri;
const response_type = query.response_type;
const client_id = query.client_id;
const scope = query.scope;
const error = decodeURIComponent(query.error as string);
const error_description = decodeURIComponent(query.error_description as string);

const validUrlParameters = redirect_uri && response_type && client_id && scope;

const oauthProviders = await useOAuthProviders()
</script>