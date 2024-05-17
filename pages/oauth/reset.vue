<template>
    <div class="flex min-h-screen relative flex-col justify-center py-12 px-8">
        <img crossorigin="anonymous" src="https://cdn.lysand.org/logo-long-dark.webp" alt="Lysand logo"
            class="mx-auto h-24 hidden md:block mb-10" />
        <ClientOnly>
            <div v-if="validUrlParameters"
                class="sm:mx-auto w-full sm:max-w-md px-10 py-10 rounded md:ring-1 md:ring-white/10">
                <div v-if="error" class="ring-1 ring-white/10 rounded p-4 bg-red-500 text-white mb-10">
                    <h2 class="font-bold text-lg">An error occured</h2>
                    <span class="text-sm">{{ error_description }}</span>
                </div>
                <VeeForm class="space-y-6" method="POST" :validation-schema="schema" action="/api/auth/reset">
                    <input type="hidden" name="token" :value="token" />

                    <h1 class="font-bold text-2xl text-gray-50 text-center tracking-tight">Reset your password</h1>

                    <VeeField name="password" as="div" v-slot="{ errors, field }" validate-on-change>
                        <LoginInput label="Password" placeholder="Password here" type="password"
                            autocomplete="current-password" required :is-invalid="errors.length > 0" v-bind="field" />
                        <VeeErrorMessage name="password" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                            {{ message }}
                        </VeeErrorMessage>
                    </VeeField>

                    <VeeField name="password2" as="div" v-slot="{ errors, field }" validate-on-change>
                        <LoginInput label="Confirm password" placeholder="Confirm password" type="password"
                            autocomplete="current-password" required :is-invalid="errors.length > 0" v-bind="field" />
                        <VeeErrorMessage name="password2" as="p" class="mt-2 text-sm text-red-600" v-slot="{ message }">
                            {{ message }}
                        </VeeErrorMessage>
                    </VeeField>

                    <p class="mt-6 text-sm leading-8 font-semibold text-red-300">This will reset your
                        password. Be sure to put it in a password manager.
                    </p>

                    <ButtonsPrimary type="submit" class="w-full">Reset</ButtonsPrimary>
                </VeeForm>
            </div>
            <div v-else-if="success">
                <h1 class="text-2xl font-bold tracking-tight text-gray-50 sm:text-4xl text-center">Password reset
                    successful!
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-300 text-center">
                    You can now login to your account with your new password.
                </p>
            </div>
            <div v-else class="mx-auto max-w-md">
                <h1 class="text-2xl font-bold tracking-tight text-gray-50 sm:text-4xl">Invalid access
                    parameters
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-300">This page should be accessed
                    through a valid password reset request. Please ask your admin to reset your password.
                </p>

                <p class="mt-6 text-lg leading-8 text-gray-300">
                    Found a problem? Report it on <a href="https://github.com/lysand-org/lysand/issues/new/choose"
                        target="_blank" class="underline text-pink-700">the issue tracker</a>.
                </p>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import LoginInput from "../../components/LoginInput.vue";

const tokenData = useTokenData();
tokenData.value = null;

const schema = toTypedSchema(
    z
        .object({
            password: z.string().min(3).max(100),
            password2: z.string().min(3).max(100),
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

const query = new URLSearchParams(
    window?.location.search ?? useRequestURL().search,
);
const token = query.get("token");
const login_reset = query.get("login_reset") === "true";
const success = query.get("success") === "true";
let error = query.get("error");
let error_description = query.get("error_description");

if (login_reset) {
    error = "Login reset";
    error_description =
        "Your password has been reset by an administrator. Please change it here.";
}

const validUrlParameters = token;
</script>