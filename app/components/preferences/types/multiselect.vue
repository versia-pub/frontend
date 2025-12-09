<template>
    <TypeBase :pref="pref" :name="name" v-slot="{ setValue, value }">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline">Pick</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
                <DropdownMenuCheckboxItem
                    v-for="[option, title] in Object.entries(pref.options.options)"
                    :key="option"
                    :model-value="value.includes(option)"
                    @update:model-value="checked => {
                    if (checked) {
                        setValue([...value, option]);
                    } else {
                        setValue(value.filter((v: any) => v !== option));
                    }
                }"
                >
                    {{ title }}
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </TypeBase>
</template>

<script lang="ts" setup>
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { preferences as prefs } from "../preferences";
import type { MultiSelectPreference } from "../types";
import TypeBase from "./type-base.vue";

const { pref, name } = defineProps<{
    pref: MultiSelectPreference<string>;
    name: keyof typeof prefs;
}>();
</script>
