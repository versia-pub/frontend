<template>
    <div class="p-6 flex items-center justify-center h-dvh w-dvw">
        <div class="flex flex-col items-center justify-center gap-4">
            <Loader class="animate-spin size-8" />
            <!-- <p class="text-xl font-semibold tracking-tight">Versia Frontend</p> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Loader } from "lucide-vue-next";
</script>
