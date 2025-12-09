<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    as: "div",
});
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn('prose prose-sm block relative dark:prose-invert duration-200 !max-w-full break-words prose-a:no-underline prose-a:hover:underline', $style.content, props.class)"
    >
        <slot/>
    </Primitive>
</template>

<style module>
@import url("~/styles/content.css");
</style>
