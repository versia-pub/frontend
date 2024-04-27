<template>
    <button v-bind="$props" type="button" :disabled="loading"
        :class="['rounded-md duration-200 relative hover:shadow disabled:opacity-70 content-none disabled:cursor-not-allowed px-3 py-2 text-sm font-semibold text-white shadow-sm', loading && '[&>*]:invisible']">
        <div v-if="loading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !visible">
            <Icon name="tabler:loader-2" class="animate-spin w-5 h-5" />
        </div>
        <slot />
    </button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<
    Props & {
        loading?: boolean;
    }
>();
</script>

<style></style>