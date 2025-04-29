<template>
    <Base :pref="pref" v-slot="{ setValue, value }">
        <Select :model-value="value" @update:model-value="setValue">
            <SelectTrigger>
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="[val, title] in Object.entries(pref.options.options)" :value="val">
                        {{ title }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </Base>
</template>

<script lang="ts" setup>
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import type { SelectPreference } from "../types";
import Base from "./base.vue";

const { pref } = defineProps<{
    pref: SelectPreference<string>;
}>();
</script>
