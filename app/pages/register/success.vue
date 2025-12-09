<template>
    <div
        class="flex h-svh items-center justify-center px-6 py-12 lg:px-8 bg-center bg-no-repeat bg-cover"
        :style="{
        backgroundImage: 'url(/images/banner.webp)'
    }"
    >
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>{{ m.late_mean_capybara_fade() }}</CardTitle>
                <CardDescription>
                    {{ m.left_maroon_myna_drip() }}
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
import { NuxtLink } from "#components";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import * as m from "~~/paraglide/messages.js";

useHead({
    title: "Success!",
});
</script>
