<template>
    <button v-bind="$props" type="button" :disabled="loading"
        :class="['relative isolate text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:shadow before:hidden after:absolute after:-z-10 after:-inset-px after:rounded-md before:disabled:shadow-none after:disabled:shadow-none text-white cursor-default rounded-md duration-200 hover:shadow disabled:opacity-70 content-none disabled:cursor-not-allowed shadow-sm bg-[--btn-bg] before:bg-[--btn-bg] after:active:bg-[--btn-hover-overlay] after:hover:bg-[--btn-hover-overlay]', loading && '[&>*]:invisible']">
        <div v-if="loading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !visible">
            <iconify-icon icon="tabler:loader-2" height="1.25rem" width="1.25rem" class="animate-spin" />
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