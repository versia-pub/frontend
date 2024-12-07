<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as m from "~/paraglide/messages.js";
import {
    type ConfirmModalOptions,
    type ConfirmModalResult,
    confirmModalService,
} from "./composable.ts";

const isOpen = ref(false);
const modalOptions = ref<ConfirmModalOptions>({
    title: m.antsy_whole_alligator_blink(),
    message: "",
    inputType: "none",
    confirmText: m.antsy_whole_alligator_blink(),
    cancelText: m.soft_bold_ant_attend(),
});
const inputValue = ref("");
const resolvePromise = ref<((result: ConfirmModalResult) => void) | null>(null);

function open(options: ConfirmModalOptions): Promise<ConfirmModalResult> {
    isOpen.value = true;
    modalOptions.value = {
        title: options.title || m.antsy_whole_alligator_blink(),
        message: options.message,
        inputType: options.inputType || "none",
        confirmText: options.confirmText || m.antsy_whole_alligator_blink(),
        cancelText: options.cancelText || m.soft_bold_ant_attend(),
    };
    inputValue.value = options.defaultValue || "";

    return new Promise((resolve) => {
        resolvePromise.value = resolve;
    });
}

function handleConfirm() {
    if (resolvePromise.value) {
        resolvePromise.value({
            confirmed: true,
            value: inputValue.value,
        });
    }
    isOpen.value = false;
}

function handleCancel() {
    if (resolvePromise.value) {
        resolvePromise.value({
            confirmed: false,
        });
    }
    isOpen.value = false;
}

confirmModalService.register({
    open,
});
</script>

<template>
    <AlertDialog :key="String(isOpen)" :open="isOpen" @update:open="isOpen = false">
        <AlertDialogContent class="sm:max-w-[425px] flex flex-col">
            <AlertDialogHeader>
                <AlertDialogTitle>{{ modalOptions.title }}</AlertDialogTitle>
                <AlertDialogDescription v-if="modalOptions.message">
                    {{ modalOptions.message }}
                </AlertDialogDescription>
            </AlertDialogHeader>

            <Input v-if="modalOptions.inputType === 'text'" v-model="inputValue" />

            <Textarea v-else-if="modalOptions.inputType === 'textarea'" v-model="inputValue" rows="6" />

            <AlertDialogFooter class="w-full">
                <AlertDialogCancel :as-child="true">
                    <Button variant="outline" @click="handleCancel">
                        {{ modalOptions.cancelText }}
                    </Button>
                </AlertDialogCancel>
                <AlertDialogAction :as-child="true">
                    <Button @click="handleConfirm">
                        {{ modalOptions.confirmText }}
                    </Button>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>