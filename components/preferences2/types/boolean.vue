<template>
    <Base :pref="pref" v-slot="{ setValue, value }">
        <Switch @update:model-value="setValue" :model-value="value" />
    </Base>
</template>

<script lang="ts" setup>
import { Switch } from "~/components/ui/switch";
import type { BooleanPreference } from "../types";
import Base from "./base.vue";

const { pref } = defineProps<{
    pref: BooleanPreference;
}>();
</script>
