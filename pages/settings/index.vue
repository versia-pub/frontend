<template>
    <SidebarsSettings>
        <template #behaviour>
            <SettingsRenderer :setting="setting" v-for="setting of getSettingsForPath(
                settings,
                SettingPages.Behaviour,
            )" :key="setting.id" />
        </template>
        <template #appearance>
            <SettingsRenderer :setting="setting" v-for="setting of getSettingsForPath(
                settings,
                SettingPages.Appearance,
            )" :key="setting.id" />
        </template>
        <template #advanced>
            <SettingsRenderer :setting="setting" v-for="setting of getSettingsForPath(
                settings,
                SettingPages.Advanced,
            )" :key="setting.id" />
        </template>
        <template #account>
            <SettingsProfileEditor />
        </template>
    </SidebarsSettings>
</template>

<script setup lang="ts">
import { SettingPages, getSettingsForPath } from "~/settings";

definePageMeta({
    layout: "app",
});

const settings = useSettings();
</script>