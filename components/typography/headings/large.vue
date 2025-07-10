<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    as: "h1",
});
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn('text-4xl font-extrabold tracking-tight text-balance', props.class)"
    >
        <slot />
    </Primitive>
</template>
