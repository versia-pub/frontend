<template>
    <div class="md:px-8 px-4 py-2 max-w-7xl mx-auto relative">
        <ProfileEditor ref="profileEditor" />

        <Transition name="slide-down">
            <Alert
                v-if="profileEditor?.dirty"
                layout="button"
                class="mb-4 absolute top-4 inset-x-4 w-[calc(100%-2rem)]"
            >
                <Check class="size-4" />
                <AlertTitle>Unsaved changes</AlertTitle>
                <AlertDescription >
                    Click "apply" to save your changes.
                </AlertDescription>
                <!-- Add pl-4 because Alert is adding additional padding, which we don't want -->
                <Button
                    variant="secondary"
                    @click="profileEditor?.submitForm"
                    class="w-full !pl-4"
                    >Apply</Button
                >
            </Alert>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { Check } from "lucide-vue-next";
// biome-ignore lint/style/useImportType: <explanation>
import ProfileEditor from "~/components/preferences/profile/editor.vue";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
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
