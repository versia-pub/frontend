<template>
    <Card>
        <FormItem class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <CardHeader class="flex flex-col gap-1.5 p-0">
                <FormLabel class="font-semibold tracking-tight" :as="CardTitle">
                    {{ title }}
                </FormLabel>
                <FormDescription class="text-xs leading-none" v-if="description">
                    {{ description }}
                </FormDescription>
            </CardHeader>
            <FormControl>
                <slot />
            </FormControl>
            <FormMessage />
        </FormItem>
    </Card>
</template>

<script lang="ts" setup>
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

const { title, description } = defineProps<{
    title: string;
    description?: string;
}>();
</script>
