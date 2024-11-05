<template>
    <div class="flex flex-col gap-y-1">
        <h4 class="row-start-1 select-none text-base/6 sm:text-sm/6 text-white font-semibold">{{ setting.title
            }}
        </h4>
        <textarea v-model="content"
            class="resize-none min-h-48 mt-1 prose prose-invert max-w-full ring-1 ring-white/20 font-mono placeholder:text-zinc-500 bg-transparent rounded appearance-none disabled:cursor-not-allowed"
            aria-label="Start typing here..."></textarea>
        <p v-if="setting.description" class="text-xs mt-2 text-gray-400">{{ setting.description }}</p>
    </div>
</template>

<script lang="ts" setup>
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