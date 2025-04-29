<template>
    <Base :pref="pref" v-slot="{ setValue, value }">
        <NumberField :model-value="value" @update:model-value="setValue" :min="pref.options.min" :max="pref.options.max" :step="pref.options.integer ? 1 : pref.options.step">
            <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
            </NumberFieldContent>
        </NumberField>
    </Base>
</template>

<script lang="ts" setup>
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "~/components/ui/number-field";
import type { NumberPreference } from "../types";
import Base from "./base.vue";

const { pref } = defineProps<{
    pref: NumberPreference;
}>();
</script>
