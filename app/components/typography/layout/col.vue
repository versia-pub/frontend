<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
    wrap?: boolean;
    centered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    as: "div",
});
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn('flex flex-col', props.wrap && 'flex-wrap', props.class, props.centered && 'items-center')"
    >
        <slot />
    </Primitive>
</template>
