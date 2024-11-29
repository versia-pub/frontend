import {
    confirmModalService,
    confirmModalWithInputService,
} from "./service.ts";
import type { ConfirmModalOptions, ConfirmModalResult } from "./types.ts";

export function useConfirmModal() {
    const confirm = (
        options: ConfirmModalOptions,
    ): Promise<ConfirmModalResult> => {
        return confirmModalService.confirm(options);
    };

    const confirmWithInput = (
        options: ConfirmModalOptions,
        placeholder?: string,
    ): Promise<ConfirmModalResult> => {
        return confirmModalWithInputService.confirm(options, placeholder);
    };

    return {
        confirm,
        confirmWithInput,
    };
}
