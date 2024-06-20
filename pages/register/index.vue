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
                <h1 class="font-bold text-2xl text-gray-50 text-center tracking-tight">Account details</h1>

                <VeeField name="username" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <InputsLabelAndError>
                            <InputsLabel for="username">Username</InputsLabel>
                            <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                        </InputsLabelAndError>
                        <InputsText id="username" type="text" placeholder="thespeedy" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" autocomplete="username"
                            :spellcheck="false" />
                    </InputsField>
                </VeeField>

                <VeeField name="email" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <InputsLabelAndError>
                            <InputsLabel for="email">Email address</InputsLabel>
                            <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                        </InputsLabelAndError>
                        <InputsText id="email" type="email" placeholder="joseph.jones@gmail.com" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" autocomplete="email" />
                    </InputsField>
                </VeeField>

                <VeeField name="password" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <InputsLabelAndError>
                            <InputsLabel for="password">Password</InputsLabel>
                            <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                        </InputsLabelAndError>
                        <InputsPassword id="password" placeholder="hunter2" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" :show-strength="true"
                            autocomplete="new-password" />
                    </InputsField>
                </VeeField>

                <VeeField name="password-confirm" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <InputsLabelAndError>
                            <InputsLabel for="password-confirm">Confirm password</InputsLabel>
                            <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                        </InputsLabelAndError>
                        <InputsPassword id="password-confirm" placeholder="hunter2" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" autocomplete="new-password" />
                    </InputsField>
                </VeeField>

                <VeeField name="tos" v-slot="{ errorMessage, field }" validate-on-change>
                    <InputsField>
                        <div class="flex flex-row gap-x-2 items-center">
                            <InputsCheckbox :checked="true" id="tos" required :disabled="true" v-bind="field" />
                            <InputsLabel for="tos" class="!text-gray-200">
                                I agree to the Terms of Service
                            </InputsLabel>
                        </div>
                        <InputsError v-if="errorMessage">{{ errorMessage }}</InputsError>
                    </InputsField>
                </VeeField>

                <Collapsible.Root>
                    <Collapsible.Trigger class="w-full">
                        <ButtonsSecondary type="button" class="w-full">View Terms of Service</ButtonsSecondary>
                    </Collapsible.Trigger>
                    <Collapsible.Content
                        class="prose prose-invert prose-sm p-4 ring-1 ring-white/10 bg-dark-700 rounded mt-3">
                        <div v-html="tos?.content"></div>
                    </Collapsible.Content>
                </Collapsible.Root>

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
import { Collapsible } from "@ark-ui/vue";
import type { ResponseError } from "@lysand-org/client";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const schema = toTypedSchema(
    z
        .object({
            email: z.string().email(),
            password: z.string().min(3).max(255),
            "password-confirm": z.string().min(3).max(255),
            username: z
                .string()
                .min(3)
                .regex(
                    /^[a-z0-9_]+$/,
                    "Must be lowercase letters, numbers, or underscores",
                ),
            reason: z.string().optional(),
        })
        .superRefine((data, ctx) => {
            if (data.password !== data["password-confirm"]) {
                ctx.addIssue({
                    path: [...ctx.path, "password-confirm"],
                    code: "custom",
                    message: "Passwords do not match",
                });
            }
            return {};
        }),
);

const client = useClient();
const tos = useTos(client);

const errors = ref<{
    error?: string;
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
        .then(() => {
            navigateTo("/register/success");
        })
        .catch((e) => {
            const error = e as ResponseError<{
                error: string;
            }>;
            // @ts-ignore
            errors.value = error.response.data || {};
        })
        .finally(() => {
            isLoading.value = false;
        });
};
</script>

<style>
@keyframes slideDown {
    from {
        height: 0;
    }

    to {
        height: var(--height);
    }
}

@keyframes slideUp {
    from {
        height: var(--height);
    }

    to {
        height: 0;
    }
}

[data-scope='collapsible'][data-part='content'][data-state='open'] {
    animation: slideDown 250ms;
}

[data-scope='collapsible'][data-part='content'][data-state='closed'] {
    animation: slideUp 200ms;
}
</style>