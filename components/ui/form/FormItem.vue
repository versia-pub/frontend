<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps, useId } from "radix-vue";
import { type HTMLAttributes, provide } from "vue";
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys";

const props = withDefaults(
    defineProps<
        PrimitiveProps & {
            class?: HTMLAttributes["class"];
        }
    >(),
    {
        as: "div",
    },
);

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
    <Primitive :as="props.as" :as-child="props.asChild" :class="cn('space-y-2', props.class)">
        <slot />
    </Primitive>
</template>
