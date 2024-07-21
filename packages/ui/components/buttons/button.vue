<template>
    <button v-bind="$attrs" :type="($attrs.type as any) || 'button'" :disabled="loading"
        :class="['relative isolate text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:shadow before:hidden after:absolute after:-z-10 after:-inset-px after:rounded-md before:disabled:shadow-none after:disabled:shadow-none text-white cursor-default rounded-md duration-200 hover:shadow disabled:opacity-70 content-none disabled:cursor-not-allowed shadow-sm bg-[--btn-bg] before:bg-[--btn-bg] after:active:bg-[--btn-hover-overlay] after:duration-200 after:hover:bg-[--btn-hover-overlay] [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 inline-flex items-center justify-center gap-x-3', theme && themes[theme]]">
        <div data-spinner v-if="loading" class="absolute inset-0 bg-[--btn-bg] flex items-center justify-center">
            <iconify-icon icon="tabler:loader-2" height="none" class="animate-spin size-5" />
        </div>
        <slot />
    </button>
</template>

<script lang="ts" setup>
import "iconify-icon";
import type { ButtonHTMLAttributes } from "vue";

const themes = {
    primary:
        "[--btn-border:theme(colors.primary.950/90%)] [--btn-bg:theme(colors.primary.600)] [--btn-hover-overlay:theme(colors.white/30%)] [--btn-icon:theme(colors.primary.200)] active:[--btn-icon:theme(colors.primary.100)] hover:[--btn-icon:theme(colors.primary.100)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] border border-white/5",
    secondary:
        "[--btn-border:theme(colors.zinc.950/90%)] [--btn-bg:theme(colors.zinc.800)] [--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] active:[--btn-icon:theme(colors.zinc.300)] hover:[--btn-icon:theme(colors.zinc.300)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] border border-white/5",
    // Gradient:  bg-gradient-to-tr from-primary-300 via-purple-300 to-indigo-400
    gradient:
        "bg-[image:--btn-bg] before:bg-[image:--btn-bg] [--btn-border:theme(colors.primary.950/90%)] [--btn-bg:linear-gradient(to_right,theme(colors.primary.300),theme(colors.purple.300),theme(colors.indigo.400))] [--btn-hover-overlay:theme(colors.white/10%)] [--btn-icon:theme(colors.gray.100)] active:[--btn-icon:theme(colors.gray.50)] hover:[--btn-icon:theme(colors.gray.50)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] [&>[data-spinner]]:bg-[image:--btn-bg]",
    outline:
        "[--btn-border:theme(colors.zinc.950/90%)] [--btn-bg:transparent] [--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.200)] active:[--btn-icon:theme(colors.zinc.300)] hover:[--btn-icon:theme(colors.zinc.300)] hover:ring-1 ring-white/5",
};

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<
    Props & {
        loading?: boolean;
        theme?: keyof typeof themes;
    }
>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style></style>