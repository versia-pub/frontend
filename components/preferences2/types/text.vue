<template>
    <Base :pref="pref" v-slot="{ setValue, value }">
        <Input placeholder="Content here..." :model-value="value" @update:model-value="setValue" />
    </Base>
</template>

<script lang="ts" setup>
import { Input } from "~/components/ui/input";
import type { TextPreference } from "../types";
import Base from "./base.vue";

const { pref } = defineProps<{
    pref: TextPreference;
}>();
</script>
