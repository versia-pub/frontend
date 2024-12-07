<template>
    <div class="flex h-svh items-center justify-center px-6 py-12 lg:px-8 bg-center bg-no-repeat bg-cover" :style="{
        backgroundImage: 'url(/images/banner.webp)'
    }">
        <Card v-if="params.success" class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Success</CardTitle>
                <CardDescription>
                    Your password has been reset. You can now log in with your new password.
                </CardDescription>
            </CardHeader>
            <CardFooter class="grid">
                <Button :as="NuxtLink" href="/" variant="default">
                    Back to front page
                </Button>
            </CardFooter>
        </Card>
        <Card v-else class="w-full max-w-md">
            <form method="POST" action="/api/auth/reset" @submit="form.submitForm">
                <CardHeader>
                    <Alert v-if="params.login_reset" variant="default" class="mb-4">
                        <AlertCircle class="size-4" />
                        <AlertTitle>Info</AlertTitle>
                        <AlertDescription>
                            Your password has been reset by an administrator. Please change it here.
                        </AlertDescription>
                    </Alert>
                    <Alert v-if="params.error" variant="destructive" class="mb-4">
                        <AlertCircle class="size-4" />
                        <AlertTitle>{{ params.error }}</AlertTitle>
                        <AlertDescription>
                            {{ params.error_description }}
                        </AlertDescription>
                    </Alert>
                    <CardTitle as="h1">Reset your password</CardTitle>
                    <CardDescription>
                        Enter your new password below. Make sure to put it in a password manager.
                    </CardDescription>
                </CardHeader>
                <CardContent class="grid gap-6">
                    <FormField v-slot="{ componentField }" name="token">
                        <FormItem>
                            <FormControl>
                                <input type="hidden" v-bind="componentField" />
                            </FormControl>
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormLabel>
                                New password
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="hunter2" type="password" auto-capitalize="none" auto-correct="off"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password-confirm">
                        <FormItem>
                            <FormLabel>
                                Confirm password
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="hunter2" type="password" auto-capitalize="none" auto-correct="off"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </CardContent>
                <CardFooter class="grid gap-2">
                    <Button variant="default" type="submit">Reset</Button>
                </CardFooter>
            </form>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { AlertCircle } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { NuxtLink } from "#components";

useHead({
    title: "Reset Password",
});

identity.value = null;

const formSchema = toTypedSchema(
    z
        .object({
            token: z.string(),
            password: z
                .string()
                .min(3, {
                    message: "Must be at least 3 characters long",
                })
                .max(100, {
                    message: "Must be at most 100 characters long",
                }),
            "password-confirm": z
                .string()
                .min(3, {
                    message: "Must be at least 3 characters long",
                })
                .max(100, {
                    message: "Must be at most 100 characters long",
                }),
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

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        token: (params.token as string) ?? undefined,
    },
});
</script>