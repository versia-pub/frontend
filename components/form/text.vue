<template>
    <FormItem>
        <FormLabel>
            {{ title }}
        </FormLabel>
        <FormControl>
            <slot />
        </FormControl>
        <FormDescription v-if="description">
            {{ description }}
        </FormDescription>
        <FormMessage />
    </FormItem>
</template>

<script lang="ts" setup>
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
