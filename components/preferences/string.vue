<template>
    <Card class="grid grid-rows-[1fr,auto] xl:grid-rows-none xl:grid-cols-[1fr,auto] items-center p-6 gap-4">
        <CardHeader class="space-y-0.5 p-0">
            <CardTitle class="text-base">
                {{ setting.title() }}
            </CardTitle>
            <CardDescription>
                {{ setting.description() }}
            </CardDescription>
        </CardHeader>
        <CardFooter class="p-0">
            <Input :model-value="setting.value" @update:model-value="v => { setting.value = String(v) }" />
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
import { Input } from "~/components/ui/input";
import type { StringSetting } from "~/settings.ts";

defineModel<StringSetting>("setting", {
    required: true,
});
</script>