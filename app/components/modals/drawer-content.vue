<template>
    <DrawerContent class="flex flex-col gap-2 px-4 mb-4 [&>:nth-child(2)]:mt-4">
        <slot />
    </DrawerContent>
</template>

<script lang="ts" setup>
import { DrawerContent } from "../ui/drawer";
</script>
