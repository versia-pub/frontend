<template>
    <HeadlessTransitionRoot as="template" :show="isOpen">
        <Dialog.Root :open="isOpen" @update:open="handleOpenChange" :close-on-escape="true"
            :close-on-interact-outside="true">
            <Teleport to="body">
                <Dialog.Positioner class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
                    <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                        enter-to="opacity-100" leave="ease-in duration-300" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <Dialog.Backdrop class="fixed inset-0 bg-black/70 backdrop-blur-sm" />
                    </HeadlessTransitionChild>

                    <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="ease-in duration-300" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <Dialog.Content class="relative w-full md:max-w-md p-6 rounded bg-dark-800 ring-1 ring-white/10 shadow-xl">
                            <Dialog.Title class="mb-4 text-lg font-bold tracking-tight text-gray-100 sm:text-xl">
                                {{ modalOptions.title || 'Confirm Action' }}
                            </Dialog.Title>

                            <div class="mb-6 text-gray-300">
                                {{ modalOptions.message }}
                            </div>

                            <div v-if="withInput" class="mb-4">
                                <input v-model="inputValue" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    :placeholder="inputPlaceholder" />
                            </div>

                            <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 *:!py-2">
                                <Button @click="handleCancel"
                                   theme="outline">
                                    {{ modalOptions.cancelText || 'Cancel' }}
                                </button>
                                <Button @click="handleConfirm"
                                    theme="primary">
                                    {{ modalOptions.confirmText || 'Confirm' }}
                                </button>
                            </div>
                        </Dialog.Content>
                    </HeadlessTransitionChild>
                </Dialog.Positioner>
            </Teleport>
        </Dialog.Root>
    </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { Dialog } from "@ark-ui/vue";
import Button from "~/packages/ui/components/buttons/button.vue";
import {
    confirmModalService,
    confirmModalWithInputService,
} from "./service.ts";
import type { ConfirmModalOptions, ConfirmModalResult } from "./types.ts";

const isOpen = ref(false);
const modalOptions = ref<ConfirmModalOptions>({ message: "" });
const resolvePromise = ref<((result: ConfirmModalResult) => void) | null>(null);
const inputValue = ref("");
const withInput = ref(false);
const inputPlaceholder = ref("");

const open = async (
    options: ConfirmModalOptions,
): Promise<ConfirmModalResult> => {
    modalOptions.value = options;
    isOpen.value = true;
    withInput.value = false;
    inputValue.value = "";

    return new Promise((resolve) => {
        resolvePromise.value = resolve;
    });
};

const openWithInput = async (
    options: ConfirmModalOptions,
    placeholder = "Enter value",
): Promise<ConfirmModalResult> => {
    modalOptions.value = options;
    isOpen.value = true;
    withInput.value = true;
    inputValue.value = "";
    inputPlaceholder.value = placeholder;

    return new Promise((resolve) => {
        resolvePromise.value = resolve;
    });
};

const handleConfirm = () => {
    if (resolvePromise.value) {
        resolvePromise.value({
            confirmed: true,
            value: withInput.value ? inputValue.value : undefined,
        });
        isOpen.value = false;
    }
};

const handleCancel = () => {
    if (resolvePromise.value) {
        resolvePromise.value({ confirmed: false });
        isOpen.value = false;
    }
};

const handleOpenChange = (open: boolean) => {
    if (!open && resolvePromise.value) {
        resolvePromise.value({ confirmed: false });
        isOpen.value = false;
    }
};

// Register the component with the service
confirmModalService.register({
    open,
});
confirmModalWithInputService.register({
    open: openWithInput,
});
</script>