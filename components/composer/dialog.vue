<script setup lang="ts">
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Status, StatusSource } from "@versia/client/types";
import { toast } from "vue-sonner";
import Composer from "./composer.vue";

useListen("composer:open", () => {
    if (identity.value) {
        open.value = true;
    }
});

useListen("composer:edit", async (note) => {
    const id = toast.loading("Loading note data...", {
        duration: 0,
    });
    const { data: source } = await client.value.getStatusSource(note.id);
    relation.value = {
        type: "edit",
        note,
        source,
    };
    open.value = true;
    toast.dismiss(id);
});

useListen("composer:reply", (note) => {
    relation.value = {
        type: "reply",
        note,
    };
    open.value = true;
});

useListen("composer:quote", (note) => {
    relation.value = {
        type: "quote",
        note,
    };
    open.value = true;
});

useListen("composer:close", () => {
    open.value = false;
    relation.value = null;
});

const open = ref(false);
const relation = ref(
    null as {
        type: "reply" | "quote" | "edit";
        note: Status;
        source?: StatusSource;
    } | null,
);
</script>

<template>
    <Dialog v-model:open="open" @update:open="o => {if (!o) { relation = null}}">
        <DialogContent :hide-close="true" class="sm:max-w-xl max-w-full w-full grid-rows-[minmax(0,1fr)_auto] max-h-[90dvh] p-5 pt-6 top-0 sm:top-1/2 translate-y-0 sm:-translate-y-1/2">
            <Composer :relation="relation ?? undefined" />
        </DialogContent>
    </Dialog>
</template>