import { ref } from "vue";
import type { ConfirmModalOptions, ConfirmModalResult } from "./types.ts";

class ConfirmModalService {
    private modalRef = ref<{
        open: (options: ConfirmModalOptions) => Promise<ConfirmModalResult>;
    } | null>(null);

    register(modal: {
        open: (options: ConfirmModalOptions) => Promise<ConfirmModalResult>;
    }) {
        this.modalRef.value = modal;
    }

    confirm(options: ConfirmModalOptions): Promise<ConfirmModalResult> {
        if (!this.modalRef.value) {
            throw new Error("Confirmation modal not initialized");
        }
        return this.modalRef.value.open(options);
    }
}

class ConfirmModalWithInputService {
    private modalRef = ref<{
        open: (
            options: ConfirmModalOptions,
            placeholder?: string,
        ) => Promise<ConfirmModalResult>;
    } | null>(null);

    register(modal: {
        open: (
            options: ConfirmModalOptions,
            placeholder?: string,
        ) => Promise<ConfirmModalResult>;
    }) {
        this.modalRef.value = modal;
    }

    confirm(
        options: ConfirmModalOptions,
        placeholder?: string,
    ): Promise<ConfirmModalResult> {
        if (!this.modalRef.value) {
            throw new Error("Confirmation modal not initialized");
        }
        return this.modalRef.value.open(options, placeholder);
    }
}

export const confirmModalService = new ConfirmModalService();
export const confirmModalWithInputService = new ConfirmModalWithInputService();
