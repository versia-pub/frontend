<template>
    <div class="flex h-svh items-center justify-center px-6 py-12 lg:px-8 bg-center bg-no-repeat bg-cover" :style="{
        backgroundImage: 'url(/images/banner.webp)'
    }">
        <Card v-if="instance?.registrations.enabled ?? true" class="w-full max-w-md" as="form" @submit="handleSubmit">
            <CardHeader>
                <Alert v-if="errors.error" variant="destructive" class="mb-4">
                    <AlertCircle class="size-4" />
                    <AlertTitle>{{ m.vexed_each_falcon_enjoy() }}</AlertTitle>
                    <AlertDescription>
                        {{ errors.error }}
                    </AlertDescription>
                </Alert>
                <CardTitle as="h1" class="text-2xl wrap-break-word">{{ m.wide_topical_vole_walk() }}</CardTitle>
            </CardHeader>
            <CardContent v-if="instance && tos" class="grid gap-6">
                <FormField v-slot="{ componentField }" name="username">
                    <FormItem>
                        <FormLabel>
                            {{ m.keen_clean_nils_slurp() }}
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
                            {{ m.top_inclusive_wallaby_hack() }}
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
                            {{ m.livid_bright_wallaby_quiz() }}
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
                            {{ m.awful_cozy_jannes_rise() }}
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
                                    {{ m.plane_quick_chipmunk_rush() }} <DialogTrigger :as-child="true"><Button variant="link"
                                            class="px-0 underline">{{ m.glad_last_crow_dine() }}</Button>.</DialogTrigger>
                                    <DialogContent class="max-h-[90vh]! overflow-auto">
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
                    <p>{{ m.happy_house_dragonfly_clap() }}</p>
                </div>
            </CardContent>
            <CardFooter v-if="instance && tos" class="grid gap-2">
                <Button variant="default" type="submit">{{ m.early_last_ocelot_praise() }}</Button>
            </CardFooter>
            <div v-else class="p-4 flex items-center justify-center h-48">
                <Loader class="size-8 animate-spin" />
            </div>
        </Card>
        <Card v-else class="w-full max-w-md">
            <CardHeader>
                <CardTitle>{{ m.wide_away_cat_taste() }}</CardTitle>
                <CardDescription>
                    {{ m.safe_candid_horse_jump() }}
                </CardDescription>
            </CardHeader>
            <CardFooter class="grid">
                <Button :as="NuxtLink" href="/" variant="default">
                    {{ m.every_tangy_koala_persist() }}
                </Button>
            </CardFooter>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Client, type ResponseError } from "@versia/client";
import { AlertCircle, Loader } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { z } from "zod";
import { NuxtLink } from "#components";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import * as m from "~~/paraglide/messages.js";

useHead({
    title: m.early_last_ocelot_praise(),
});

const schema = toTypedSchema(
    z
        .object({
            email: z.email(),
            password: z.string().min(3).max(255),
            "password-confirm": z.string().min(3).max(255),
            username: z
                .string()
                .min(3)
                .regex(/^[a-z0-9_-]+$/, m.sea_maroon_peacock_yell()),
            reason: z.string().optional(),
            tos: z.boolean().refine((value) => value, {
                message: m.civil_loose_coyote_jump(),
            }),
        })
        .superRefine((data, ctx) => {
            if (data.password !== data["password-confirm"]) {
                ctx.addIssue({
                    path: ["password-confirm"],
                    code: "custom",
                    message: m.candid_fancy_leopard_prosper(),
                });
            }
        }),
);

const client = new Client(new URL(useRequestURL().origin));
const instance = useInstanceFromClient(client);
const form = useForm({
    validationSchema: schema,
});
const authStore = useAuthStore();

const handleSubmit = form.handleSubmit((values) => {
    isLoading.value = true;
    authStore.client
        .registerAccount(
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
