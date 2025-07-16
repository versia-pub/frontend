<template>
    <div
        class="h-svh flex items-center justify-center px-4 bg-center bg-no-repeat bg-cover"
        :style="{
            backgroundImage: 'url(/images/banner.webp)',
        }"
    >
        <Card class="w-full max-w-md *:w-full p-6">
            <CardHeader>
                <CardTitle>{{ m.aware_awful_crow_spur() }}</CardTitle>
                <CardDescription
                    >{{ m.mushy_soft_lizard_propel() }}<br />{{
                        m.short_arable_leopard_zap()
                    }}
                </CardDescription>
            </CardHeader>
            <CardContent class="grid">
                <pre
                    class="rounded bg-muted px-4 py-2 border text-center w-full font-mono text-sm font-semibold select-all"
                    >{{ code }}</pre
                >
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
import * as m from "~~/paraglide/messages.js";

useHead({
    title: m.spare_aqua_warthog_mend(),
});

const { code } = useUrlSearchParams();
</script>
