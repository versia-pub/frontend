<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    as: "strong",
});
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn('font-semibold', props.class)"
    >
        <slot />
    </Primitive>
</template>
