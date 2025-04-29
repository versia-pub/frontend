<template>
    <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-2 hover:bg-muted/40 duration-75 p-4">
        <div class="flex flex-col gap-1">
            <h3 class="text-sm font-semibold tracking-tight">{{ pref.options.name }}</h3>
            <small v-if="pref.options.description" class="text-xs font-medium leading-none text-muted-foreground">{{
                pref.options.description }}</small>
        </div>
        <div class="flex items-center justify-end">
            <slot :value="value" :set-value="setValue" />
        </div>
        <slot name="extra" :value="value" :set-value="setValue" />
    </div>
</template>

<script lang="ts" setup>
import type { Preference } from "../types";

const { pref } = defineProps<{
    pref: Preference<any>;
}>();

const value = ref<any>(pref.options.defaultValue);
const setValue = (newValue: MaybeRef<any>) => {
    value.value = toValue(newValue);
};

defineSlots<{
    default(props: {
        value: any;
        setValue: (value: MaybeRef<any>) => void;
    }): any;
    extra(props: {
        value: any;
        setValue: (value: MaybeRef<any>) => void;
    }): any;
}>();
</script>
