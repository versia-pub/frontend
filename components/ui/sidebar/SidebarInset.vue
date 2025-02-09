<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
import { SettingIds } from "~/settings";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();

const bgSetting = useSetting(SettingIds.BackgroundURL);
const bgImage = computed(() =>
    bgSetting.value.value && URL.canParse(bgSetting.value.value as string)
        ? bgSetting.value.value
        : "/images/banner.webp",
);
</script>

<template>
    <main :class="cn(
        'relative flex min-h-svh max-w-full flex-1 flex-col bg-background',
        'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:overflow-hidden md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow bg-cover bg-center bg-no-repeat',
        props.class,
    )" :style="{
        backgroundImage: `url('${bgImage}')`,
    }">
        <!-- Overlay for the background image -->
        <div class="absolute -z-10 inset-0 bg-black/20" />
        <slot />
    </main>
</template>
