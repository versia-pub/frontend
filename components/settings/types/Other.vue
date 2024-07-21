<template>
    <div class="grid grid-cols-[1fr_auto] gap-x-4">
        <h4 class="row-start-1 select-none text-base/6 sm:text-sm/6 text-white font-semibold">{{ setting.title
            }}
        </h4>
        <p class="text-xs mt-1 row-start-3 text-red-300 font-semibold">Not implemented</p>
    </div>
</template>

<script lang="ts" setup>
import type { SettingIds } from "~/settings";

const props = defineProps<{
    id: SettingIds;
}>();

const setting = useSetting(props.id);
</script>