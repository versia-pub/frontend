<template>
    <div class="w-full px-8 py-4 bg-dark-700 hover:bg-dark-500 duration-100 h-full">
        <div class="max-w-7xl mx-auto h-full">
            <SettingBoolean v-if="setting.type === SettingType.Boolean" :id="id" />

            <SettingCode v-else-if="setting.type === SettingType.Code" :id="id" />
            <SettingEnum v-else-if="setting.type === SettingType.Enum" :id="id" />
            <SettingOther v-else :id="id" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type SettingIds, SettingType } from "~/settings";
import SettingBoolean from "./types/Boolean.vue";
import SettingCode from "./types/Code.vue";
import SettingEnum from "./types/Enum.vue";
import SettingOther from "./types/Other.vue";

const props = defineProps<{
    id: SettingIds;
}>();

const setting = useSetting(props.id);
</script>