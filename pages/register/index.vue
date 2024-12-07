<template>
    <div class="flex h-svh items-center justify-center px-6 py-12 lg:px-8 bg-center bg-no-repeat bg-cover" :style="{
        backgroundImage: 'url(/images/banner.webp)'
    }">
        <Card v-if="instance?.registrations.enabled ?? true" class="w-full max-w-md" as="form" @submit="handleSubmit">
            <CardHeader>
                <Alert v-if="errors.error" variant="destructive" class="mb-4">
                    <AlertCircle class="size-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {{ errors.error }}
                    </AlertDescription>
                </Alert>
                <CardTitle as="h1" class="text-2xl break-words">Create an account</CardTitle>
            </CardHeader>
            <CardContent v-if="instance && tos" class="grid gap-6">
                <FormField v-slot="{ componentField }" name="username">
                    <FormItem>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="petergriffin" type="text" auto-capitalize="none"
                                auto-complete="idenfifier" auto-correct="off" :disabled="isLoading"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel>
                            Email address
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="peter.griffin@fox.com" type="email" auto-capitalize="none"
                                auto-complete="email" auto-correct="off" :disabled="isLoading"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="hunter2" type="password" auto-capitalize="none" auto-complete="password"
                                auto-correct="off" :disabled="isLoading" v-bind="componentField" />
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
                            <Input placeholder="hunter2" type="password" auto-capitalize="none" auto-complete="password"
                                auto-correct="off" :disabled="isLoading" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField, value, handleChange }" name="tos">
                    <FormItem class="space-y-0">
                        <div class="flex flex-row gap-x-2 items-center ">
                            <FormControl>
                                <Checkbox v-bind="componentField" :checked="value" @update:checked="handleChange" />
                            </FormControl>
                            <FormLabel>
                                <Dialog>
                                    I agree to the <DialogTrigger :as-child="true"><Button variant="link"
                                            class="px-0 underline">Terms of Service</Button>.</DialogTrigger>
                                    <DialogContent class="!max-h-[90vh] overflow-auto">
                                        <DialogHeader>
                                            <DialogTitle>{{ instance.title }}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div v-html="tos.content" class="prose prose-sm dark:prose-invert"></div>
                                    </DialogContent>
                                </Dialog>
                            </FormLabel>
                        </div>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div class="flex-col flex gap-y-1 text-sm text-muted-foreground">
                    <p>Passwords are never stored in plain text.</p>
                </div>
            </CardContent>
            <CardFooter v-if="instance && tos" class="grid gap-2">
                <Button variant="default" type="submit">Register</Button>
            </CardFooter>
            <div v-else class="p-4 flex items-center justify-center h-48">
                <Loader class="size-8 animate-spin" />
            </div>
        </Card>
        <Card v-else class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sorry :c</CardTitle>
                <CardDescription>
                    Registrations are disabled on this instance.
                </CardDescription>
            </CardHeader>
            <CardFooter class="grid">
                <Button :as="NuxtLink" href="/" variant="default">
                    Back to front page
                </Button>
            </CardFooter>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Client, type ResponseError } from "@versia/client";
import { AlertCircle, Check, Loader } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { NuxtLink } from "#components";

useHead({
    title: "Register",
});

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
            tos: z.boolean().refine((value) => value, {
                message: "You must agree to the Terms of Service",
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

const instance = useInstanceFromClient(new Client(new URL(useBaseUrl().value)));
const form = useForm({
    validationSchema: schema,
});

const handleSubmit = form.handleSubmit((values) => {
    isLoading.value = true;
    ref(client)
        .value?.registerAccount(
            values.username,
            values.email,
            values.password,
            true,
            "en",
            values.reason || "Empty reason",
        )
        .then(() => {
            navigateTo("/register/success");
        })
        .catch((e) => {
            const error = e as ResponseError<{
                error: string;
            }>;
            errors.value = error.response.data || {};
        })
        .finally(() => {
            isLoading.value = false;
        });
});

const tos = useTos(client);

const errors = ref<{
    error?: string;
}>({});

const isLoading = ref(false);
</script>
