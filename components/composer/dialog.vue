<script setup lang="ts">
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Composer from "./composer.vue";

useListen("composer:open", () => {
    if (identity.value) {
        open.value = true;
    }
});

const open = ref(false);
</script>

<template>
    <Dialog v-model:open="open">
        <DialogContent :hide-close="true" class="sm:max-w-xl max-w-full w-full grid-rows-[minmax(0,1fr)_auto] max-h-[90dvh] p-5 pt-6 top-0 sm:top-1/2 translate-y-0 sm:-translate-y-1/2">
            <Composer />
        </DialogContent>
    </Dialog>
</template>