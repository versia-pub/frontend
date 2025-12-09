<template>
    <TypeBase :pref="pref" :name="name" v-slot="{ setValue, value }">
        <Switch @update:model-value="setValue" :model-value="value"/>
    </TypeBase>
</template>

<script lang="ts" setup>
import { Switch } from "~/components/ui/switch";
import type { preferences as prefs } from "../preferences";
import type { BooleanPreference } from "../types";
import TypeBase from "./type-base.vue";

const { pref, name } = defineProps<{
    pref: BooleanPreference;
    name: keyof typeof prefs;
}>();
</script>
