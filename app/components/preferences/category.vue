<template>
    <section class="space-y-2">
        <CardTitle class="text-xs">
            {{ name }}
        </CardTitle>
        <Card class="p-0 gap-0">
            <div v-for="preference of preferences" :key="preference">
                <TextPreferenceVue v-if="(prefs[preference] instanceof TextPreference)" :pref="(prefs[preference] as TextPreference)" :name="preference" />
                <BooleanPreferenceVue v-else-if="(prefs[preference] instanceof BooleanPreference)" :pref="(prefs[preference] as BooleanPreference)" :name="preference" />
                <SelectPreferenceVue v-else-if="(prefs[preference] instanceof SelectPreference)" :pref="(prefs[preference] as SelectPreference<string>)" :name="preference" />
                <NumberPreferenceVue v-else-if="(prefs[preference] instanceof NumberPreference)" :pref="(prefs[preference] as NumberPreference)" :name="preference" />
                <MultiSelectPreferenceVue v-else-if="(prefs[preference] instanceof MultiSelectPreference)" :pref="(prefs[preference] as MultiSelectPreference<string>)" :name="preference" />
                <CodePreferenceVue v-else-if="(prefs[preference] instanceof CodePreference)" :pref="(prefs[preference] as CodePreference)" :name="preference" />
                <UrlPreferenceVue v-else-if="(prefs[preference] instanceof UrlPreference)" :pref="(prefs[preference] as UrlPreference)" :name="preference" />
            </div>
        </Card>
    </section>
</template>

<script lang="ts" setup>
import { Card, CardTitle } from "../ui/card/index.ts";
import { preferences as prefs } from "./preferences.ts";
import BooleanPreferenceVue from "./types/boolean.vue";
import CodePreferenceVue from "./types/code.vue";
import MultiSelectPreferenceVue from "./types/multiselect.vue";
import NumberPreferenceVue from "./types/number.vue";
import SelectPreferenceVue from "./types/select.vue";
import TextPreferenceVue from "./types/text.vue";
import UrlPreferenceVue from "./types/url.vue";
import {
    BooleanPreference,
    CodePreference,
    MultiSelectPreference,
    NumberPreference,
    SelectPreference,
    TextPreference,
    UrlPreference,
} from "./types.ts";

const { preferences = [], name } = defineProps<{
    preferences: (keyof typeof prefs)[];
    name: string;
}>();
</script>
