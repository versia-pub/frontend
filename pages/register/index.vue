<template>
    <div class="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 relative">
        <img src="https://camo.githubusercontent.com/353460d1fdb1667ec993159270dcece12c491fb38165460215a519ab93f4e554/68747470733a2f2f63646e2d7765622e63706c757370617463682e636f6d2f6c7973616e642e77656270"
            alt="Lysand logo" class="mx-auto h-24 hidden md:block" />
        <div v-if="instance && instance.registrations" class="mt-10 mx-auto w-full max-w-md">
            <div v-if="Object.keys(errors).length > 0"
                class="ring-1 ring-white/10 rounded p-4 bg-red-500 text-white mb-10">
                <h2 class="font-bold text-lg">Error</h2>
                <span class="text-sm">{{ errors.error }}</span>
            </div>
            <VeeForm class="space-y-6" @submit="register as any" :validation-schema="schema">
                <h1 class="font-bold text-2xl text-gray-50 text-center tracking-tight">Register</h1>

                <VeeField name="email" as="div" v-slot="{ errors, field }" validate-on-change>
                    <LoginInput label="Email" placeholder="contact@cpluspatch.com" type="email" autocomplete="email"
                        required :is-invalid="errors.length > 0" v-bind="field" :disabled="isLoading" />
                    <VeeErrorMessage name="email" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                        {{ message }}
                    </VeeErrorMessage>
                </VeeField>

                <VeeField name="username" as="div" v-slot="{ errors, field }" validate-on-change>
                    <LoginInput label="Username" placeholder="thespeedy" type="text" autocomplete="username" required
                        :is-invalid="errors.length > 0" v-bind="field" :disabled="isLoading" />
                    <VeeErrorMessage name="username" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                        {{ message }} (must only contain lowercase letters, numbers and underscores)
                    </VeeErrorMessage>
                </VeeField>

                <VeeField name="password" as="div" v-slot="{ errors, field }" validate-on-change>
                    <LoginInput label="Password" placeholder="hunter2" type="password" autocomplete="current-password"
                        required :is-invalid="errors.length > 0" v-bind="field" :disabled="isLoading" />
                    <VeeErrorMessage name="password" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                        {{ message }}
                    </VeeErrorMessage>
                </VeeField>

                <VeeField name="password2" as="div" v-slot="{ errors, field }" validate-on-change>
                    <LoginInput label="Confirm password" placeholder="hunter2" type="password"
                        autocomplete="current-password" required :is-invalid="errors.length > 0" v-bind="field"
                        :disabled="isLoading" />
                    <VeeErrorMessage name="password2" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                        {{ message }}
                    </VeeErrorMessage>
                </VeeField>

                <VeeField name="reason" as="div" v-slot="{ errors, field }" validate-on-change>
                    <label for="reason" class="block text-sm font-medium leading-6 text-gray-50">Why do you want to
                        join?</label>
                    <div class="mt-2">
                        <textarea rows="4" required :is-invalid="errors.length > 0" name="reason" :disabled="isLoading"
                            placeholder="Brief text (optional)"
                            class="block w-full disabled:opacity-70 disabled:hover:cursor-wait bg-dark-500 rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                    </div>
                    <VeeErrorMessage name="reason" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                        {{ message }}
                    </VeeErrorMessage>
                </VeeField>

                <VeeField name="tos" as="div" v-slot="{ errors, field }" validate-on-change>
                    <input type="checkbox" :disabled="isLoading" name="tos"
                        class="rounded disabled:hover:cursor-wait mr-1 align-middle mb-0.5 text-pink-700 !ring-0 !outline-none"
                        required />
                    <span class="text-sm text-gray-100">I agree to the terms and conditions of this server <a
                            class="underline font-bold" target="_blank" :href="instance.uri">available here</a></span>
                    <VeeErrorMessage name="tos" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                        {{ message }}
                    </VeeErrorMessage>
                </VeeField>

                <ButtonsPrimary type="submit" class="w-full" :disabled="isLoading">{{ isLoading ? "Registering..." :
                    "Register" }}</ButtonsPrimary>
            </VeeForm>
        </div>
        <div v-else>
            <h1 class="text-2xl font-bold tracking-tight text-gray-50 sm:text-4xl text-center">Registrations are
                disabled
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-200 text-center">Ask this instance's admin to enable them in
                config!
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import type { AxiosError } from "axios";
import { z } from "zod";
import LoginInput from "../../components/LoginInput.vue";

const schema = toTypedSchema(
    z
        .object({
            email: z.string().email(),
            password: z.string().min(3),
            password2: z.string().min(3),
            username: z
                .string()
                .min(3)
                .regex(/^[a-z0-9_]+$/),
            reason: z.string().optional(),
            tos: z.string(),
        })
        .superRefine((data, ctx) => {
            if (data.password !== data.password2) {
                ctx.addIssue({
                    path: [...ctx.path, "password2"],
                    code: "custom",
                    message: "Passwords do not match",
                });
            }
            return {};
        }),
);

const client = await useMegalodon();
const instance = await useInstance(client);

const errors = ref<{
    [key: string]: {
        error: string;
        description: string;
    }[];
}>({});

const isLoading = ref(false);

const register = (result: {
    username: string;
    email: string;
    password: string;
    reason: string;
}) => {
    isLoading.value = true;
    client
        .registerAccount(
            result.username,
            result.email,
            result.password,
            true,
            "en",
            result.reason || "Empty reason",
        )
        .then(async (res) => {
            navigateTo("/register/success");
        })
        .catch(async (err) => {
            const error = err as AxiosError;
            // @ts-ignore
            errors.value = error.response?.data || {};
            console.error(err);
        })
        .finally(() => {
            isLoading.value = false;
        });
};
</script>