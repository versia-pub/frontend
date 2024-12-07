<template>
    <div class="h-svh flex items-center justify-center px-4 bg-center bg-no-repeat bg-cover" :style="{
        backgroundImage: 'url(/images/banner.webp)'
    }">
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Here's your code</CardTitle>
                <CardDescription>You have signed in successfully.<br />Paste the following code into your app:
                </CardDescription>
            </CardHeader>
            <CardContent class="grid">
                <pre class="rounded bg-muted px-4 py-2 border text-center w-full font-mono text-sm font-semibold select-all">{{ code }}</pre>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

useHead({
    title: "Authorization Code",
});

const { code } = useUrlSearchParams();
</script>
