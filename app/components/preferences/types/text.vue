<template>
    <TypeBase :pref="pref" :name="name" v-slot="{ setValue, value }">
        <Input
            placeholder="Content here..."
            :model-value="value"
            @update:model-value="setValue"
        />
    </TypeBase>
</template>

<script lang="ts" setup>
import { Input } from "~/components/ui/input";
import type { preferences as prefs } from "../preferences";
import type { TextPreference } from "../types";
import TypeBase from "./type-base.vue";

const { pref, name } = defineProps<{
    pref: TextPreference;
    name: keyof typeof prefs;
}>();
</script>
