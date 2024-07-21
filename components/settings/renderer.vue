<template>
    <div class="w-full px-8 py-4 bg-dark-700 hover:bg-dark-500 duration-100 h-full">
        <div class="max-w-7xl mx-auto h-full">
            <Switch.Root v-model:checked="checked" class="grid grid-cols-[1fr_auto] gap-x-4"
                @click="setting.notImplemented ? $event.preventDefault() : undefined"
                v-if="setting.type === SettingType.Boolean" @update:checked="c => checked = c">
                <Switch.Label :data-disabled="setting.notImplemented ? '' : undefined"
                    class="row-start-1 select-none text-base/6 data-[disabled]:opacity-50 sm:text-sm/6 text-white font-semibold">
                    {{
                        setting.title
                    }}</Switch.Label>
                <p v-if="setting.notImplemented" class="text-xs mt-1 row-start-3 text-red-300 font-semibold">Not
                    implemented
                </p>
                <p v-else :data-disabled="setting.notImplemented ? '' : undefined"
                    class="text-base/6 row-start-2 data-[disabled]:opacity-50 sm:text-sm/6 text-gray-300">{{
                        setting.description }}
                </p>
                <Switch.Control :data-disabled="setting.notImplemented ? '' : undefined"
                    :data-checked="checked ? '' : undefined"
                    class="group col-start-2 relative isolate inline-flex h-6 w-10 cursor-default rounded-full p-[3px] sm:h-5 sm:w-8 transition duration-0 ease-in-out data-[changing]:duration-200 forced-colors:outline forced-colors:[--switch-bg:Highlight] ring-1 ring-inset bg-white/5 ring-white/15 data-[checked]:bg-[--switch-bg] data-[checked]:ring-[--switch-bg-ring] focus:outline-none focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 hover:data-[checked]:ring-[--switch-bg-ring] hover:ring-white/25 data-[disabled]:bg-zinc-200 data-[disabled]:data-[checked]:bg-zinc-200 data-[disabled]:opacity-50 data-[disabled]:bg-white/15 data-[disabled]:data-[checked]:bg-white/15 data-[disabled]:data-[checked]:ring-white/15 [--switch-bg-ring:transparent] [--switch-bg:theme(colors.primary.600/25%)] [--switch-shadow:theme(colors.black/10%)] [--switch:white] [--switch-ring:theme(colors.white/10%)]">
                    <Switch.Thumb
                        class="pointer-events-none relative inline-block size-[1.125rem] rounded-full sm:size-3.5 translate-x-0 transition duration-200 ease-in-out border border-transparent bg-white shadow ring-1 ring-black/5 group-data-[checked]:bg-[--switch] group-data-[checked]:shadow-[--switch-shadow] group-data-[checked]:ring-[--switch-ring] group-data-[checked]:translate-x-4 sm:group-data-[checked]:translate-x-3 group-data-[disabled]:group-data-[checked]:bg-white group-data-[disabled]:group-data-[checked]:shadow group-data-[disabled]:group-data-[checked]:ring-black/5" />
                </Switch.Control>
                <Switch.HiddenInput />
            </Switch.Root>
            <div v-else class="grid grid-cols-[1fr_auto] gap-x-4">
                <h4 class="row-start-1 select-none text-base/6 sm:text-sm/6 text-white font-semibold">{{ setting.title
                    }}
                </h4>
                <p class="text-xs mt-1 row-start-3 text-red-300 font-semibold">Not implemented</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Switch } from "@ark-ui/vue";
import { type Setting, type SettingIds, SettingType } from "~/settings";

const props = defineProps<{
    setting: Setting;
}>();
const checked = ref(!!props.setting.value);

const setting = useSetting(props.setting.id as SettingIds);

watch(checked, (c) => {
    setting.value.value = c;
});
</script>