export type ConfirmModalOptions = {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    inputType?: "none" | "text" | "textarea";
    defaultValue?: string;
};

export type ConfirmModalResult = {
    confirmed: boolean;
    value?: string;
};

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

export const confirmModalService = new ConfirmModalService();
