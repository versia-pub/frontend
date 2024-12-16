<template>
    <div class="flex h-svh items-center justify-center px-6 py-12 lg:px-8 bg-center bg-no-repeat bg-cover" :style="{
        backgroundImage: 'url(/images/banner.webp)'
    }">
        <Card v-if="params.success" class="w-full max-w-md">
            <CardHeader>
                <CardTitle>{{ m.late_mean_capybara_fade() }}</CardTitle>
                <CardDescription>
                    {{ m.brave_acidic_lobster_fetch() }}
                </CardDescription>
            </CardHeader>
            <CardFooter class="grid">
                <Button :as="NuxtLink" href="/" variant="default">
                    {{ m.every_tangy_koala_persist() }}
                </Button>
            </CardFooter>
        </Card>
        <Card v-else class="w-full max-w-md">
            <form method="POST" action="/api/auth/reset" @submit="form.submitForm">
                <CardHeader>
                    <Alert v-if="params.login_reset" variant="default" class="mb-4">
                        <AlertCircle class="size-4" />
                        <AlertTitle>{{ m.east_loud_lobster_explore() }}</AlertTitle>
                        <AlertDescription>
                            {{ m.good_plane_gazelle_glow() }}
                        </AlertDescription>
                    </Alert>
                    <Alert v-if="params.error" variant="destructive" class="mb-4">
                        <AlertCircle class="size-4" />
                        <AlertTitle>{{ params.error }}</AlertTitle>
                        <AlertDescription>
                            {{ params.error_description }}
                        </AlertDescription>
                    </Alert>
                    <CardTitle as="h1">{{ m.tired_green_sloth_evoke() }}</CardTitle>
                    <CardDescription>
                        {{ m.solid_slow_platypus_talk() }}
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
                                {{ m.true_male_gadfly_stab() }}
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
                                {{ m.awful_cozy_jannes_rise() }}
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
                    <Button variant="default" type="submit">{{ m.noisy_round_skate_yell() }}</Button>
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
import * as m from "~/paraglide/messages.js";
import { NuxtLink } from "#components";

useHead({
    title: m.arable_arable_herring_lead(),
});

identity.value = null;

const formSchema = toTypedSchema(
    z
        .object({
            token: z.string(),
            password: z
                .string()
                .min(3, {
                    message: m.smart_bold_macaw_aid({
                        count: 3,
                    }),
                })
                .max(100, {
                    message: m.dry_smug_goldfish_promise({
                        count: 100,
                    }),
                }),
            "password-confirm": z
                .string()
                .min(3, {
                    message: m.smart_bold_macaw_aid({
                        count: 3,
                    }),
                })
                .max(100, {
                    message: m.dry_smug_goldfish_promise({
                        count: 100,
                    }),
                }),
        })
        .superRefine((data, ctx) => {
            if (data.password !== data["password-confirm"]) {
                ctx.addIssue({
                    path: [...ctx.path, "password-confirm"],
                    code: "custom",
                    message: m.candid_fancy_leopard_prosper(),
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