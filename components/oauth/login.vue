<script setup lang="ts">
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import type { Instance } from "@versia/client";
import { Loader } from "lucide-vue-next";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const { instance } = defineProps<{
    instance: Instance;
}>();

const isLoading = ref(false);
const ssoConfig = computed(() => instance.sso);

const formSchema = toTypedSchema(
    z.object({
        identifier: z
            .string()
            .min(3, {
                message: "Must be at least 3 characters long",
            })
            .or(
                z.string().email({
                    message: "Must be a valid email address",
                }),
            ),
        password: z.string().min(3, {
            message: "Must be at least 3 characters long",
        }),
    }),
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
    console.info("Form submitted!", values);
});

const redirectUrl = new URL("/api/auth/login", `https://${instance.domain}`);

const params = useUrlSearchParams();

for (const name of [
    "redirect_uri",
    "response_type",
    "client_id",
    "scope",
    "state",
]) {
    if (params[name]) {
        redirectUrl.searchParams.set(name, params[name] as string);
    }
}

const issuerRedirectUrl = (issuerId: string) => {
    const url = new URL("/oauth/sso", useBaseUrl().value);

    for (const name of [
        "redirect_uri",
        "response_type",
        "client_id",
        "scope",
        "state",
    ]) {
        if (params[name]) {
            url.searchParams.set(name, params[name] as string);
        }
    }

    url.searchParams.set("issuer", issuerId);
    return url.toString();
};
</script>

<template>
    <div class="grid gap-6">
        <form @submit="onSubmit" method="post" :action="redirectUrl.toString()">
            <div class="grid gap-6">
                <FormField v-slot="{ componentField }" name="identifier">
                    <FormItem>
                        <FormLabel>
                            Email (or username)
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="petergriffin" type="email" auto-capitalize="none"
                            auto-complete="idenfifier" auto-correct="off" :disabled="isLoading"
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
                            <Input placeholder="hunter2" type="password" auto-capitalize="none"
                                auto-complete="password" auto-correct="off" :disabled="isLoading"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button :disabled="isLoading" type="submit">
                    <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                    Sign In
                </Button>
            </div>
        </form>
        <div v-if="ssoConfig && ssoConfig.providers.length > 0" class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
        </div>
        <div v-if="ssoConfig && ssoConfig.providers.length > 0" class="flex flex-col gap-2">
            <Button as="a" :href="issuerRedirectUrl(provider.id)" variant="outline" type="button" :disabled="isLoading" v-for="provider of ssoConfig.providers">
                <Loader v-if="isLoading" class="mr-2 animate-spin" />
                <img crossorigin="anonymous" :src="provider.icon" :alt="`${provider.name}'s logo`"
                    class="size-4 mr-2" />
                {{ provider.name }}
            </Button>
        </div>
    </div>
</template>