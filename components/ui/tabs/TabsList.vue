<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TabsList, type TabsListProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";

const props = defineProps<
    TabsListProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="cn(
      'bg-muted text-muted-foreground inline-flex w-fit items-center justify-center rounded-lg p-1 overflow-x-auto',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
