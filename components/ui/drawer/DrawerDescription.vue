<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { DrawerDescriptionProps } from "vaul-vue";
import { DrawerDescription } from "vaul-vue";
import { type HtmlHTMLAttributes, computed } from "vue";

const props = defineProps<
    DrawerDescriptionProps & { class?: HtmlHTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
  <DrawerDescription
    data-slot="drawer-description"
    v-bind="delegatedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DrawerDescription>
</template>
