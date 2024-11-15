<template>
    <Renderer :id="id" v-for="id of settingsIds" :key="id" />
</template>

<script lang="ts" setup>
import {
    type SettingIds,
    type SettingPages,
    getSettingsForPage,
} from "~/settings";
import Renderer from "./renderer.vue";

const props = defineProps<{
    page: SettingPages;
}>();

const settingsIds = Object.keys(getSettingsForPage(props.page)) as SettingIds[];
</script>