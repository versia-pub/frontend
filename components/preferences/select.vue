<template>
    <Card class="grid grid-cols-[1fr,auto] items-center px-6 py-4 gap-2">
        <CardHeader class="space-y-0.5 p-0">
            <CardTitle class="text-base">
                {{ setting.title() }}
            </CardTitle>
            <CardDescription>
                {{ setting.description() }}
            </CardDescription>
        </CardHeader>
        <CardFooter class="p-0">
            <Select :model-value="setting.value" @update:model-value="v => { setting.value = v }">
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="option of setting.options" :value="option.value">
                        {{ option.label() }}
                    </SelectItem>
                </SelectContent>
            </Select>
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
import type { EnumSetting } from "~/settings.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

defineModel<EnumSetting>("setting", {
    required: true,
});
</script>
