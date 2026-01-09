<template>
    <div
        ref="container"
        class="overflow-y-hidden relative duration-200"
        :style="{
        maxHeight: collapsed ? '18rem' : `${container?.scrollHeight}px`,
    }"
    >
        <slot />
        <div
            v-if="isOverflowing && collapsed"
            class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/5 to-transparent rounded-b"
        ></div>
        <Button
            v-if="isOverflowing"
            @click="collapsed = !collapsed"
            class="absolute bottom-2 right-1/2 translate-x-1/2"
        >
            {{ collapsed
                    ? `${m.lazy_honest_mammoth_bump()}${formattedCharacterCount ? ` • ${m.dark_spare_goldfish_charm({
                        count: formattedCharacterCount,
                    })}` : ""}`
                    : m.that_misty_mule_arrive() }}
        </Button>
    </div>
</template>

<script lang="ts" setup>
import * as m from "~~/paraglide/messages.js";
import { getLocale } from "~~/paraglide/runtime";
import { Button } from "../ui/button";

const { characterCount = 0 } = defineProps<{
    characterCount?: number;
}>();

const container = useTemplateRef<HTMLDivElement>("container");
const collapsed = ref(true);

// max-h-72 is 18rem
const remToPx = (rem: number) =>
    rem *
    Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize || "16px",
    );

const isOverflowing = computed(() => {
    if (!container.value) {
        return false;
    }
    return container.value.scrollHeight > remToPx(18);
});

const formattedCharacterCount =
    characterCount > 0
        ? new Intl.NumberFormat(getLocale()).format(characterCount)
        : undefined;
</script>
