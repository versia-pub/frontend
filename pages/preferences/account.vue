<template>
    <div class="md:px-8 px-4 py-2 max-w-7xl mx-auto w-full space-y-6">
        <div :class="cn('grid gap-2', profileEditor?.dirty && 'grid-cols-[1fr,auto]')">
            <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl capitalize">
                {{ m.tasty_late_termite_sew() }}
            </h1>
            <Button class="ml-auto" v-if="profileEditor?.dirty" @click="profileEditor.submitForm">Save</Button>
        </div>
        <div class="grid xl:grid-cols-[1fr,auto] gap-4 *:max-h-[80vh]">
            <ProfileEditor ref="profileEditor" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
// biome-ignore lint/style/useImportType: <explanation>
import ProfileEditor from "~/components/preferences/profile/editor.vue";
import { Button } from "~/components/ui/button";
import * as m from "~/paraglide/messages.js";

useHead({
    title: m.actual_mean_cow_dare(),
});

definePageMeta({
    layout: "app",
    breadcrumbs: () => [
        {
            text: m.broad_whole_herring_reside(),
        },
    ],
    requiresAuth: true,
});

const profileEditor = ref<InstanceType<typeof ProfileEditor> | null>(null);
</script>