<template>
    <div class="flex flex-col gap-y-1">
        <h4 class="row-start-1 select-none text-base/6 sm:text-sm/6 text-white font-semibold">{{ setting.title
            }}
        </h4>
        <TextInput v-model:value="content" class="w-full md:w-auto min-w-72" />
        <p v-if="setting.description" class="text-xs mt-2 text-gray-400">{{ setting.description }}</p>
    </div>
</template>

<script lang="ts" setup>
import TextInput from "~/components/inputs/text-input.vue";
import type { SettingIds } from "~/settings";

const props = defineProps<{
    id: SettingIds;
}>();

const setting = useSetting(props.id);
const content = ref(setting.value.value as string);

watch(content, (c) => {
    setting.value.value = c;
});
</script>