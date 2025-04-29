<template>
    <section class="space-y-2">
        <CardTitle class="text-xs">
            {{ name }}
        </CardTitle>
        <Card class="p-0 gap-0">
            <div v-for="preference of preferences" :key="preference">
                <TextPreferenceVue v-if="(prefs[preference] instanceof TextPreference)" :pref="(prefs[preference] as TextPreference)" />
                <BooleanPreferenceVue v-else-if="(prefs[preference] instanceof BooleanPreference)" :pref="(prefs[preference] as BooleanPreference)" />
                <SelectPreferenceVue v-else-if="(prefs[preference] instanceof SelectPreference)" :pref="(prefs[preference] as SelectPreference<string>)" />
                <NumberPreferenceVue v-else-if="(prefs[preference] instanceof NumberPreference)" :pref="(prefs[preference] as NumberPreference)" />
                <MultiSelectPreferenceVue v-else-if="(prefs[preference] instanceof MultiSelectPreference)" :pref="(prefs[preference] as MultiSelectPreference<string>)" />
                <CodePreferenceVue v-else-if="(prefs[preference] instanceof CodePreference)" :pref="(prefs[preference] as CodePreference)" />
                <UrlPreferenceVue v-else-if="(prefs[preference] instanceof UrlPreference)" :pref="(prefs[preference] as UrlPreference)" />
            </div>
        </Card>
    </section>
</template>

<script lang="ts" setup>
import { Card, CardTitle } from "../ui/card";
// biome-ignore lint/style/useImportType: <explanation>
import { preferences as prefs } from "./preferences.ts";
import {
    BooleanPreference,
    CodePreference,
    MultiSelectPreference,
    NumberPreference,
    SelectPreference,
    TextPreference,
    UrlPreference,
} from "./types.ts";
import BooleanPreferenceVue from "./types/boolean.vue";
import CodePreferenceVue from "./types/code.vue";
import MultiSelectPreferenceVue from "./types/multiselect.vue";
import NumberPreferenceVue from "./types/number.vue";
import SelectPreferenceVue from "./types/select.vue";
import TextPreferenceVue from "./types/text.vue";
import UrlPreferenceVue from "./types/url.vue";

const { preferences = [], name } = defineProps<{
    preferences: (keyof typeof prefs)[];
    name: string;
}>();
</script>
