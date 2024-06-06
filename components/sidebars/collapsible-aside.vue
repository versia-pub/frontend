<template>
    <aside v-bind="$props" role="complementary"
        :class="['flex max-h-dvh overflow-hidden duration-200', open ? enterClass : leaveClass, direction === 'left' ? 'flex-row' : 'flex-row-reverse']">
        <OverlayScrollbarsComponent :defer="true"
            class="bg-dark-900 ring-1 ring-white/10 h-full overflow-y-auto w-full">
            <slot />
        </OverlayScrollbarsComponent>
        <button @click="open = !open"
            class="h-full bg-dark-700 hover:bg-dark-400 hover:cursor-pointer duration-200 py-4 px-0.5 flex items-center justify-center w-4 shrink-0">
            <iconify-icon icon="tabler:chevron-right"
                :class="['text-gray-200 duration-200', direction === 'left' ? open ? 'rotate-180' : 'rotate-0' : open ? 'rotate-0' : 'rotate-180']"
                aria-hidden="true" />
        </button>
    </aside>
</template>

<script lang="ts" setup>
// slides in and out from the left or right
import type { HTMLAttributes } from "vue";
import { OverlayScrollbarsComponent } from "#imports";

interface Props extends /* @vue-ignore */ HTMLAttributes {
    direction?: "left" | "right";
    initial?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    direction: "left",
    initial: false,
});

const leaveClass = computed(() =>
    props.direction === "left"
        ? "-left-[calc(28rem-6rem)]"
        : "-right-[calc(28rem-1rem)]",
);
const enterClass = computed(() =>
    props.direction === "left" ? "left-0" : "right-0",
);
const open = ref(props.initial);
</script>