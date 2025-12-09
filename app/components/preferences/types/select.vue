<template>
    <TypeBase :pref="pref" :name="name" v-slot="{ setValue, value }">
        <Select :model-value="value" @update:model-value="setValue">
            <SelectTrigger>
                <SelectValue placeholder="Select an option"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem
                        v-for="[val, title] in Object.entries(pref.options.options)"
                        :value="val"
                    >
                        {{ title }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </TypeBase>
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
import type { preferences as prefs } from "../preferences";
import type { SelectPreference } from "../types";
import TypeBase from "./type-base.vue";

const { pref, name } = defineProps<{
    pref: SelectPreference<string>;
    name: keyof typeof prefs;
}>();
</script>
