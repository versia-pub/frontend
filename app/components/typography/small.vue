<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
    muted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    as: "span",
});
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn('text-xs', props.class, props.muted && 'text-muted-foreground')"
    >
        <slot/>
    </Primitive>
</template>
