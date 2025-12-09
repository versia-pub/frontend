<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    as: "h3",
});
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn('text-sm font-semibold tracking-tight', props.class)"
    >
        <slot/>
    </Primitive>
</template>
