<template>
    <div class="flex min-h-screen flex-col justify-center px-6 py-12 gap-10 lg:px-8 relative">
        <img crossorigin="anonymous" src="https://cdn.lysand.org/logo.webp" alt="Lysand logo"
            class="mx-auto hidden md:inline-block h-20" />
        <div v-if="true" class="mx-auto w-full max-w-md">
            <div v-if="Object.keys(errors).length > 0"
                class="ring-1 ring-white/10 rounded p-4 bg-red-500 text-white mb-10">
                <h2 class="font-bold text-lg">Error</h2>
                <span class="text-sm">{{ errors.error }}</span>
            </div>
            <VeeForm class="flex flex-col gap-y-6" @submit="s => register((s as any))" :validation-schema="schema">
                <h1 class="font-bold text-2xl text-gray-50 text-center tracking-tight">Passwords</h1>

                <VeeField name="password" as="div" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <InputsLabelAndError>
                            <InputsLabel for="password">Password</InputsLabel>
                            <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                        </InputsLabelAndError>
                        <InputsPassword id="password" placeholder="hunter2" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" />
                    </InputsField>
                </VeeField>

                <VeeField name="password-confirm" as="div" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <InputsLabelAndError>
                            <InputsLabel for="password-confirm">Confirm password</InputsLabel>
                            <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                        </InputsLabelAndError>
                        <InputsPassword id="password-confirm" placeholder="hunter2" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" />
                    </InputsField>
                </VeeField>

                <p class="text-xs font-semibold text-gray-300">
                    Passwords are stored securely and hashed. We do not store your password in plain text.
                    Administrators
                    cannot see your password.
                </p>

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
import { z } from "zod";
// TODO: Add instance TOS link

const schema = toTypedSchema(
    z
        .object({
            password: z.string().min(3).max(255),
        })
        .superRefine((data, ctx) => {
            /* if (data.password !== data.password2) {
                ctx.addIssue({
                    path: [...ctx.path, "password2"],
                    code: "custom",
                    message: "Passwords do not match",
                });
            } */
            return {};
        }),
);

const client = useClient();
const instance = useInstance();

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
    ref(client)
        .value?.registerAccount(
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
            // @ts-ignore
            errors.value = error.response?.data || {};
            console.error(err);
        })
        .finally(() => {
            isLoading.value = false;
        });
};
</script>