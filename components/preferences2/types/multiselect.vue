<template>
    <Base :pref="pref" v-slot="{ setValue, value }">
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline">
                Pick
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuCheckboxItem v-for="[option, title] in Object.entries(pref.options.options)" :key="option"
                :model-value="value.includes(option)" @update:model-value="checked => {
                    if (checked) {
                        setValue([...value, option]);
                    } else {
                        setValue(value.filter((v: any) => v !== option));
                    }
                }">
                {{ title }}
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </Base>
</template>

<script lang="ts" setup>
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { MultiSelectPreference } from "../types";
import Base from "./base.vue";

const { pref } = defineProps<{
    pref: MultiSelectPreference<string>;
}>();
</script>
