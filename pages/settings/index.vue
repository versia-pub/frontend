<template>
    <SettingsSidebar>
        <template #behaviour>
            <Renderer :id="id" v-for="id of (Object.keys(getSettingsForPage(
                SettingPages.Behaviour,
            )) as SettingIds[])" :key="id" />
        </template>
        <template #appearance>
            <Renderer :id="id" v-for="id of (Object.keys(getSettingsForPage(
                SettingPages.Appearance,
            )) as SettingIds[])" :key="id" />
        </template>
        <template #advanced>
            <Renderer :id="id" v-for="id of (Object.keys(getSettingsForPage(
                SettingPages.Advanced,
            )) as SettingIds[])" :key="id" />
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
import { SettingIds, SettingPages, getSettingsForPage } from "~/settings";

definePageMeta({
    layout: "app",
});
</script>