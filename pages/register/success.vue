<template>
    <div class="flex h-svh items-center justify-center px-6 py-12 lg:px-8 bg-center bg-no-repeat bg-cover" :style="{
        backgroundImage: 'url(/images/banner.webp)'
    }">
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Success</CardTitle>
                <CardDescription>
                    You've successfully registered. You can now log in with your new account.
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
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { NuxtLink } from "#components";

useHead({
    title: "Success!",
});
</script>