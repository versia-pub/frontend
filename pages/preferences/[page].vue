<template>
    <div class="md:px-8 px-4 py-2 max-w-7xl mx-auto w-full">
        <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl capitalize">
            {{ page }}
        </h1>   
        <div class="grid grid-cols-1 2xl:grid-cols-2 gap-4 mt-6">
            <template v-for="[id, setting] of settingEntries">
                <SwitchPreference v-if="setting.type === SettingType.Boolean" :setting="(setting as BooleanSetting)" @update:setting="updateSetting(id, setting)" />
                <SelectPreference v-else-if="setting.type === SettingType.Enum" :setting="(setting as EnumSetting)" @update:setting="updateSetting(id, setting)" />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SelectPreference from "~/components/preferences/select.vue";
import SwitchPreference from "~/components/preferences/switch.vue";
import * as m from "~/paraglide/messages.js";
import {
    type BooleanSetting,
    type EnumSetting,
    type Setting,
    type SettingIds,
    type SettingPages,
    SettingType,
} from "~/settings.ts";

useHead({
    title: m.broad_whole_herring_reside(),
});

definePageMeta({
    layout: "app",
    breadcrumbs: () => [
        {
            text: m.broad_whole_herring_reside(),
        },
    ],
    requiresAuth: true,
});

const route = useRoute();

const page = route.params.page as SettingPages;
const settingEntries = computed(() =>
    (Object.entries(settings.value) as [SettingIds, Setting][]).filter(
        ([, s]) => s.page === page && !s.notImplemented,
    ),
);

const updateSetting = (id: SettingIds, setting: Setting) => {
    settings.value = {
        ...settings.value,
        [id]: setting,
    };
};
</script>