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
                    <Field>
                        <LabelAndError>
                            <Label for="username">Username</Label>
                            <FieldError v-if="errorMessage">{{ errorMessage }}</FieldError>
                        </LabelAndError>
                        <TextInput id="username" type="text" placeholder="thespeedy" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" autocomplete="username"
                            :spellcheck="false" />
                    </Field>
                </VeeField>

                <VeeField name="email" v-slot="{ errorMessage, field }" validate-on-change>
                    <Field>
                        <LabelAndError>
                            <Label for="email">Email address</Label>
                            <FieldError v-if="errorMessage">{{ errorMessage }}</FieldError>
                        </LabelAndError>
                        <TextInput id="email" type="email" placeholder="joseph.jones@gmail.com" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" autocomplete="email" />
                    </Field>
                </VeeField>

                <VeeField name="password" v-slot="{ errorMessage, field }" validate-on-change>
                    <Field>
                        <LabelAndError>
                            <Label for="password">Password</Label>
                            <FieldError v-if="errorMessage">{{ errorMessage }}</FieldError>
                        </LabelAndError>
                        <PasswordInput id="password" placeholder="hunter2" required v-bind="field" :disabled="isLoading"
                            :is-invalid="!!errorMessage" :show-strength="true" autocomplete="new-password" />
                    </Field>
                </VeeField>

                <VeeField name="password-confirm" v-slot="{ errorMessage, field }" validate-on-change>
                    <Field>
                        <LabelAndError>
                            <Label for="password-confirm">Confirm password</Label>
                            <FieldError v-if="errorMessage">{{ errorMessage }}</FieldError>
                        </LabelAndError>
                        <PasswordInput id="password-confirm" placeholder="hunter2" required v-bind="field"
                            :disabled="isLoading" :is-invalid="!!errorMessage" autocomplete="new-password" />
                    </Field>
                </VeeField>

                <VeeField name="tos" v-slot="{ errorMessage, field }" validate-on-change>
                    <Field>
                        <div class="flex flex-row gap-x-2 items-center">
                            <CheckboxInput :checked="true" id="tos" required :disabled="true" v-bind="field" />
                            <Label for="tos" class="!text-gray-200">
                                I agree to the Terms of Service
                            </Label>
                        </div>
                        <FieldError v-if="errorMessage">{{ errorMessage }}</FieldError>
                    </Field>
                </VeeField>

                <Collapsible.Root>
                    <Collapsible.Trigger class="w-full">
                        <Button theme="secondary" class="w-full">View Terms of Service</Button>
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

                <Button theme="primary" type="submit" class="w-full" :disabled="isLoading">{{ isLoading ?
                    "Registering..." :
                    "Register" }}</Button>
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
import CheckboxInput from "~/components/inputs/checkbox-input.vue";
import FieldError from "~/components/inputs/field-error.vue";
import Field from "~/components/inputs/field.vue";
import LabelAndError from "~/components/inputs/label-and-error.vue";
import Label from "~/components/inputs/label.vue";
import PasswordInput from "~/components/inputs/password-input.vue";
import TextInput from "~/components/inputs/text-input.vue";
import Button from "~/packages/ui/components/buttons/button.vue";

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