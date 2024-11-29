<template>
    <Select.Root :collection="collection" v-model:model-value="selectedValues">
        <Select.Label class="select-none text-base/6 data-[disabled]:opacity-50 sm:text-sm/6 text-white font-semibold">{{ setting.title }}</Select.Label>
        <Select.Control class="mt-1">
            <Select.Trigger :disabled="setting.notImplemented" class="disabled:opacity-70 disabled:hover:cursor-not-allowed bg-dark-500 rounded-md border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6 w-full md:w-auto min-w-72 text-left px-4 flex flew-row justify-between items-center">
                <Select.ValueText placeholder="Select an option" />
                <Select.Indicator class="size-4">
                    <iconify-icon icon="tabler:chevron-down" class="size-4" width="unset" aria-hidden="true" />
                </Select.Indicator>
            </Select.Trigger>
        </Select.Control>
        <p v-if="setting.notImplemented" class="text-xs mt-2 row-start-3 text-red-300 font-semibold">Not
            implemented
        </p>
        <p v-else-if="setting.description" class="text-xs mt-2 text-gray-400">{{ setting.description }}</p>
        <Teleport to="body">
            <Select.Positioner>
                <Select.Content
                    class="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-dark-700 py-1 text-base shadow-lg ring-1 ring-white/10 focus:outline-none sm:text-sm min-w-72">
                    <Select.ItemGroup>
                        <Select.Item v-for="item in collection.items" :key="item.value" :item="item"
                            :class="['text-gray-100 hover:bg-dark-900 flex flex-row gap-4 justify-between items-center duration-100 relative cursor-default select-none py-2 px-4 group']">
                            <Select.ItemText
                                :class="['group-data-[state=checked]:font-semibold font-normal block truncate']">{{
                                item.label }}</Select.ItemText>
                            <Select.ItemIndicator
                                :class="['text-primary2-600 hidden group-data-[state=checked]:flex items-center justify-center']">
                                <iconify-icon icon="tabler:check" class="size-4" width="unset" aria-hidden="true" />
                            </Select.ItemIndicator>
                        </Select.Item>
                    </Select.ItemGroup>
                </Select.Content>
            </Select.Positioner>
        </Teleport>
        <Select.HiddenSelect />
    </Select.Root>
</template>

<script lang="ts" setup>
import { Select, createListCollection } from "@ark-ui/vue/select";
import type { EnumSetting, SettingIds } from "~/settings";

const props = defineProps<{
    id: SettingIds;
}>();

const setting = useSetting(props.id) as Ref<EnumSetting>;
const selectedValues = ref([setting.value.value]);

const collection = createListCollection({
    items: setting.value.options.map((option) => ({
        value: option.value,
        label: option.label,
    })),
});

watch(selectedValues, (value) => {
    if (!value[0]) {
        return;
    }

    setting.value.value = value[0];
});
</script>