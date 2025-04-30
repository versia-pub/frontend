<template>
    <Base :pref="pref" :name="name" v-slot="{ setValue, value }">
        <Switch @update:model-value="setValue" :model-value="value" />
    </Base>
</template>

<script lang="ts" setup>
import { Switch } from "~/components/ui/switch";
import type { preferences as prefs } from "../preferences";
import type { BooleanPreference } from "../types";
import Base from "./base.vue";

const { pref, name } = defineProps<{
    pref: BooleanPreference;
    name: keyof typeof prefs;
}>();
</script>
