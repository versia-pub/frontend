<template>
    <Tabs.Root v-model="tab">
        <Tabs.List class="flex flex-row p-4 gap-4 bg-background-800 relative ring-1 ring-white/5 overflow-x-auto">
            <Tabs.Trigger :value="page" v-for="page of SettingPages" :as-child="true">
                <ButtonBase class="capitalize hover:bg-white/5">
                    {{ page }}
                </ButtonBase>
            </Tabs.Trigger>
            <Tabs.Indicator class="h-1 bg-text-300 w-[--width] top-0 rounded-b" />
        </Tabs.List>
        <Tabs.Content :value="page" v-for="page of SettingPages">
            <slot :name="page" />
        </Tabs.Content>
    </Tabs.Root>
</template>

<script lang="ts" setup>
import { Tabs } from "@ark-ui/vue";
import ButtonBase from "~/packages/ui/components/buttons/button.vue";
import { SettingPages } from "~/settings";

const tab = ref<SettingPages>(
    (window.location.hash.slice(1) as SettingPages) || SettingPages.Account,
);

// Update page hash when tab changes
watch(
    tab,
    (value) => {
        window.location.hash = value;
    },
    { immediate: true },
);
</script>