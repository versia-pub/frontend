<template>
    <TypeBase :pref="pref" :name="name" v-slot="{ setValue, value }">
        <NumberField
            :model-value="value"
            @update:model-value="setValue"
            :min="pref.options.min"
            :max="pref.options.max"
            :step="pref.options.integer ? 1 : pref.options.step"
        >
            <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
            </NumberFieldContent>
        </NumberField>
    </TypeBase>
</template>

<script lang="ts" setup>
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "~/components/ui/number-field";
import type { preferences as prefs } from "../preferences";
import type { NumberPreference } from "../types";
import TypeBase from "./type-base.vue";

const { pref, name } = defineProps<{
    pref: NumberPreference;
    name: keyof typeof prefs;
}>();
</script>
