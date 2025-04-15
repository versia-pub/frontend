<template>
    <Card class="grid grid-cols-[1fr_auto] items-center px-6 py-4 gap-2">
        <CardHeader class="space-y-0.5 p-0">
            <CardTitle class="text-base">
                {{ setting.title() }}
            </CardTitle>
            <CardDescription>
                {{ setting.description() }}
            </CardDescription>
        </CardHeader>
        <CardFooter class="p-0">
            <Switch :disabled="setting.notImplemented" :checked="setting.value" @update:checked="v => { setting.value = v }" />
        </CardFooter>
    </Card>
</template>

<script lang="ts" setup>
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import type { BooleanSetting } from "~/settings.ts";

defineModel<BooleanSetting>("setting", {
    required: true,
});
</script>
