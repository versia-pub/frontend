<template>
    <SettingsSidebar>
        <template #behaviour>
            <SettingPage :page="SettingPages.Behaviour" />
        </template>
        <template #appearance>
            <SettingPage :page="SettingPages.Appearance" />
        </template>
        <template #account>
            <ProfileEditor />
        </template>
        <template #emojis>
            <EmojiEditor />
        </template>
    </SettingsSidebar>
</template>

<script setup lang="ts">
import EmojiEditor from "~/components/settings/emojis/emojis.vue";
import SettingPage from "~/components/settings/page.vue";
import ProfileEditor from "~/components/settings/profile-editor.vue";
import SettingsSidebar from "~/components/sidebars/settings-sidebar.vue";
import { SettingPages } from "~/settings";

definePageMeta({
    layout: "app",
});
</script>