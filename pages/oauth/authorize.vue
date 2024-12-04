<script setup lang="ts">
import { Client } from "@versia/client";
import { AlertCircle, Loader } from "lucide-vue-next";
import UserAuthForm from "~/components/oauth/login.vue";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { NuxtLink } from "#components";

const host = new URL(useBaseUrl().value).host;
const instance = useInstanceFromClient(new Client(new URL(useBaseUrl().value)));
const { error, error_description } = useUrlSearchParams();
</script>

<template>
    <div class="container relative flex h-svh flex-col items-center justify-center md:flex-row lg:max-w-none lg:px-0">
        <Button :as="NuxtLink" href="/register" variant="link" class="absolute right-4 top-4 md:right-8 md:top-8">
            Register
        </Button>
        <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex grow bg-center bg-no-repeat bg-cover"
            :style="{
                backgroundImage: 'url(/images/banner.webp)'
            }">
            <div class="absolute top-0 left-0 w-full h-72 bg-gradient-to-t from-transparent to-black/70" />
            <div class="relative z-20 flex items-center text-lg font-medium">
                <img crossorigin="anonymous"
                    :src="instance?.thumbnail.url || 'https://cdn.versia.pub/branding/icon.svg'" alt="Versia logo"
                    class="size-10 mr-4" />
                {{ instance?.title }}
            </div>
            <!-- <div class="relative z-20 mt-auto">
                <blockquote class="space-y-2">
                    <p class="text-lg">
                        &ldquo;This library has saved me countless hours of work and
                        helped me deliver stunning designs to my clients faster than
                        ever before.&rdquo;
                    </p>
                    <footer class="text-sm">
                        Sofia Davis
                    </footer>
                </blockquote>
            </div> -->
        </div>
        <div class="lg:p-8 w-full max-w-xl">
            <div class="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[350px]">
                <Alert v-if="error" variant="destructive" class="mb-4">
                        <AlertCircle class="w-4 h-4" />
                        <AlertTitle>{{ error }}</AlertTitle>
                        <AlertDescription>
                            {{ error_description }}
                        </AlertDescription>
                    </Alert>
                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="text-2xl font-semibold tracking-tight">
                        Log in to your account.
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        Enter your credentials for <code>{{ host }}</code>.
                    </p>
                </div>
                <UserAuthForm v-if="instance" :instance="instance" />
                <div v-else class="p-4 flex items-center justify-center h-48">
                    <Loader class="size-8 animate-spin" />
                </div>
            </div>
        </div>
    </div>
</template>
