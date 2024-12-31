<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Status, StatusSource } from "@versia/client/types";
import { toast } from "vue-sonner";
import * as m from "~/paraglide/messages.js";
import Composer from "./composer.vue";

useListen("composer:open", () => {
    if (identity.value) {
        open.value = true;
    }
});

useListen("composer:edit", async (note) => {
    const id = toast.loading(m.wise_late_fireant_walk(), {
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
    // Unfocus the active element
    activeElement.value?.blur();
});

const activeElement = useActiveElement();
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
    <Dialog v-model:open="open" @update:open="o => {
        if (!o) {
            relation = null; // Unfocus the active element
            activeElement?.blur();
        }
    }">
        <DialogContent :hide-close="true"
            class="sm:max-w-xl max-w-full w-[calc(100%-2*0.5rem)] grid-rows-[minmax(0,1fr)_auto] max-h-[90dvh] p-5 pt-6 top-2 sm:top-1/2 translate-y-0 sm:-translate-y-1/2 rounded">
            <DialogTitle class="sr-only">
                {{ relation?.type === "reply" ? m.loved_busy_mantis_slide() : relation?.type === "quote" ? "Quote" :
                    m.chunky_dull_marlin_trip() }}
            </DialogTitle>
            <DialogDescription class="sr-only">
                {{ relation?.type === "reply" ? m.tired_grassy_vulture_forgive() : relation?.type === "quote" ?
                    m.livid_livid_nils_snip() : m.brief_cool_capybara_fear() }}
            </DialogDescription>
            <Composer :relation="relation ?? undefined" />
        </DialogContent>
    </Dialog>
</template>
