<template>
    <div class="flex flex-row justify-between">
        <label v-bind="$attrs"
            class="select-none font-semibold text-base/6 disabled:opacity-50 sm:text-sm/6 text-text-100">
            <slot />
        </label>
        <div :id="`${$attrs.for}-label-slot`"></div>
    </div>
</template>

<script lang="ts" setup>
import type { LabelHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ LabelHTMLAttributes {}

defineOptions({
    inheritAttrs: false,
});
const props = defineProps<Props>();
</script>