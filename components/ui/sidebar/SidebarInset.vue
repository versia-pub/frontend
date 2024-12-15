<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
import { SettingIds } from "~/settings";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();

const backgroundImage = useSetting(SettingIds.BackgroundURL);

const canParseUrl = URL.canParse;
</script>

<template>
    <main :class="cn(
        'relative flex min-h-svh max-w-full flex-1 flex-col bg-background',
        'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:overflow-hidden md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
        props.class,
    )" :style="{
        backgroundImage: canParseUrl(backgroundImage.value as string) ? `url(${backgroundImage.value})` : undefined,
        backgroundSize: canParseUrl(backgroundImage.value as string) ? 'cover' : undefined,
        backgroundPosition: canParseUrl(backgroundImage.value as string) ? 'center' : undefined,
        backgroundRepeat: canParseUrl(backgroundImage.value as string) ? 'no-repeat' : undefined,
    }">
        <!-- Overlay for the background image -->
        <div v-if="canParseUrl(backgroundImage.value as string)" class="absolute -z-10 inset-0 bg-black/20" />
        <slot />
    </main>
</template>
