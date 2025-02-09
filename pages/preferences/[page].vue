<template>
    <!-- Add padding at bottom to prevent hiding some content by the bottom navbar -->
    <div class="md:px-8 px-4 py-4 pb-20 max-w-7xl mx-auto w-full">
        <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl capitalize">
            {{ page }}
        </h1>
        <div class="grid grid-cols-1 gap-2 mt-6">
            <template v-for="[id, setting] of settingEntries">
                <SwitchPreference v-if="setting.type === SettingType.Boolean" :setting="(setting as BooleanSetting)" @update:setting="updateSetting(id, setting)" />
                <SelectPreference v-else-if="setting.type === SettingType.Enum" :setting="(setting as EnumSetting)" @update:setting="updateSetting(id, setting)" />
                <CodePreference v-else-if="setting.type === SettingType.Code" :setting="(setting as CodeSetting)" @update:setting="updateSetting(id, setting)" />
                <StringPreference v-else-if="setting.type === SettingType.String" :setting="(setting as StringSetting)" @update:setting="updateSetting(id, setting)" />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CodePreference from "~/components/preferences/code.vue";
import SelectPreference from "~/components/preferences/select.vue";
import StringPreference from "~/components/preferences/string.vue";
import SwitchPreference from "~/components/preferences/switch.vue";
import * as m from "~/paraglide/messages.js";
import {
    type BooleanSetting,
    type CodeSetting,
    type EnumSetting,
    type Setting,
    type SettingIds,
    type SettingPages,
    SettingType,
    type StringSetting,
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
