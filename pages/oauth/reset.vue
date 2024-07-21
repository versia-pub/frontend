<template>
    <div class="flex min-h-screen relative flex-col gap-10 justify-center py-12 px-8">
        <img crossorigin="anonymous" src="https://cdn.lysand.org/logo.webp" alt="Lysand logo"
            class="mx-auto hidden md:inline-block h-20 ring-1 ring-white/20 rounded" />
        <div v-if="validUrlParameters" class="mx-auto w-full max-w-md">
            <VeeForm class="flex flex-col gap-y-6" method="POST" :validation-schema="schema" action="/api/auth/reset">
                <input type="hidden" name="token" :value="params.token" />

                <h1 class="font-bold text-2xl text-gray-50 text-center tracking-tight">Reset your password</h1>

                <div v-if="error" class="ring-1 ring-white/10 rounded p-4 bg-red-500 text-white">
                    <h2 class="font-bold text-lg">An error occured</h2>
                    <span class="text-sm">{{ params.error_description }}</span>
                </div>

                <VeeField name="password" v-slot="{ errorMessage, field }" validate-on-change>
                    <Field>
                        <LabelAndError>
                            <Label for="password">New password</Label>
                            <FieldError v-if="errorMessage">{{ errorMessage }}</FieldError>
                        </LabelAndError>
                        <PasswordInput id="password" placeholder="hunter2" autocomplete="new-password" required
                            v-bind="field" :is-invalid="!!errorMessage" :show-strength="true" />
                    </Field>
                </VeeField>

                <VeeField name="password-confirm" as="div" v-slot="{ errors, field }" validate-on-change>
                    <Field>
                        <LabelAndError>
                            <Label for="password-confirm">Confirm password</Label>
                            <FieldError v-if="errors.length > 0">{{ errors[0] }}</FieldError>
                        </LabelAndError>
                        <PasswordInput id="password-confirm" placeholder="hunter2" autocomplete="new-password" required
                            v-bind="field" :is-invalid="errors.length > 0" />
                    </Field>
                </VeeField>

                <p class="text-xs font-semibold text-red-300">This will reset your
                    password. Make sure to put it in a password manager.
                </p>

                <Button theme="primary" type="submit" class="w-full">Reset</Button>
            </VeeForm>
        </div>
        <div v-else-if="params.success">
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
                    target="_blank" class="underline text-primary-700">the issue tracker</a>.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import FieldError from "~/components/inputs/field-error.vue";
import Field from "~/components/inputs/field.vue";
import LabelAndError from "~/components/inputs/label-and-error.vue";
import Label from "~/components/inputs/label.vue";
import PasswordInput from "~/components/inputs/password-input.vue";
import Button from "~/packages/ui/components/buttons/button.vue";

identity.value = null;

const schema = toTypedSchema(
    z
        .object({
            password: z.string().min(3).max(100),
            "password-confirm": z.string().min(3).max(100),
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

const params = useUrlSearchParams();
let error = params.error;
let errorDescription = params.error_description;

if (params.login_reset) {
    error = "Login reset";
    errorDescription =
        "Your password has been reset by an administrator. Please change it here.";
}

const validUrlParameters = !!params.token;
</script>