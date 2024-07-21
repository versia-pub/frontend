<template>
    <SettingsSidebar>
        <template #behaviour>
            <Renderer :setting="setting" v-for="setting of getSettingsForPath(
                settings,
                SettingPages.Behaviour,
            )" :key="setting.id" />
        </template>
        <template #appearance>
            <Renderer :setting="setting" v-for="setting of getSettingsForPath(
                settings,
                SettingPages.Appearance,
            )" :key="setting.id" />
        </template>
        <template #advanced>
            <Renderer :setting="setting" v-for="setting of getSettingsForPath(
                settings,
                SettingPages.Advanced,
            )" :key="setting.id" />
        </template>
        <template #account>
            <ProfileEditor />
        </template>
    </SettingsSidebar>
</template>

<script setup lang="ts">
import ProfileEditor from "~/components/settings/profile-editor.vue";
import Renderer from "~/components/settings/renderer.vue";
import SettingsSidebar from "~/components/sidebars/settings-sidebar.vue";
import { SettingPages, getSettingsForPath } from "~/settings";

definePageMeta({
    layout: "app",
});
</script>