<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { Check, X } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import * as m from "~~/paraglide/messages.js";
import Input from "./Input.vue";

const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes["class"];
}>();

const emits =
    defineEmits<(e: "update:modelValue", payload: string | number) => void>();

const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
});

const isValid = defineModel<boolean>("isValid");

const tryGuessUrl = (string: string) =>
    URL.canParse(`https://${string}`) &&
    string.includes(".") &&
    string.length > 3 &&
    string.charAt(string.length - 1) !== ".";

const isValidUrl = computed(
    () =>
        URL.canParse(modelValue.value as string) ||
        tryGuessUrl(modelValue.value as string),
);

watch(modelValue, (value) => {
    if (!URL.canParse(value as string) && tryGuessUrl(value as string)) {
        modelValue.value = `https://${value}`;
    }
});

watch(isValidUrl, (value) => {
    isValid.value = value;
});
</script>

<template>
    <div class="space-y-2">
        <Input v-model="modelValue" v-bind="$attrs" />
        <p v-if="isValidUrl" class="text-green-600 text-xs">
            {{ m.sunny_small_warbler_express() }}
        </p>
        <p v-else-if="(modelValue?.toString().length ?? 0) > 0" class="text-destructive text-xs">
            {{ m.teal_late_grebe_blend() }}
        </p>
    </div>
</template>
