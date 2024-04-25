<template>
    <div v-for="index of lines" :class="[
            'duration-200 animate-pulse bg-dark-100 [&:not(:first-child)]:mt-2',
            shape === 'circle' ? 'rounded-full' : 'rounded',
            ['text', 'content'].includes(type) && 'h-[1em]',
            props.class
        ]" v-if="enabled" :style="{
            width: getWidth(index, lines),
        }">
    </div>
    <slot v-else />
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        enabled: boolean;
        shape?: "circle" | "rect";
        type?: "text" | "content";
        minWidth?: number;
        maxWidth?: number;
        widthUnit?: "px" | "%";
        class?: string;
    }>(),
    {
        shape: "rect",
        type: "text",
        widthUnit: "px",
    },
);

const isContent = computed(() => props.type === "content");
const isText = computed(() => props.type === "text");
const isWidthSpecified = computed(() => props.minWidth && props.maxWidth);
const calculatedWidth = computed(
    () =>
        Math.random() * ((props.maxWidth ?? 0) - (props.minWidth ?? 0)) +
        (props.minWidth ?? 0),
);

const getWidth = (index: number, lines: number) => {
    if (isWidthSpecified.value) {
        if (isContent.value)
            return index === lines
                ? `${calculatedWidth.value}${props.widthUnit}`
                : "100%";
        return `${calculatedWidth.value}${props.widthUnit}`;
    }
    return undefined;
};

const lines = isContent.value ? Math.ceil(Math.random() * 5) : 1;
</script>