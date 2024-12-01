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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ref } from "vue";
import {
    type ConfirmModalOptions,
    type ConfirmModalResult,
    confirmModalService,
} from "./composable.ts";

const isOpen = ref(false);
const modalOptions = ref<ConfirmModalOptions>({
    title: "Confirm",
    message: "",
    inputType: "none",
    confirmText: "Confirm",
    cancelText: "Cancel",
});
const inputValue = ref("");
const resolvePromise = ref<((result: ConfirmModalResult) => void) | null>(null);

function open(options: ConfirmModalOptions): Promise<ConfirmModalResult> {
    isOpen.value = true;
    modalOptions.value = {
        title: options.title || "Confirm",
        message: options.message,
        inputType: options.inputType || "none",
        confirmText: options.confirmText || "Confirm",
        cancelText: options.cancelText || "Cancel",
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