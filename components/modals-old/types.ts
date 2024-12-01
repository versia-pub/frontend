export interface ConfirmModalOptions {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export interface ConfirmModalResult {
    confirmed: boolean;
    value?: string;
}
