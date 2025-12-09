<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as m from "~~/paraglide/messages.js";
import type { ConfirmModalOptions, ConfirmModalResult } from "./composable.ts";

defineProps<{
    modalOptions: ConfirmModalOptions;
}>();

const emit = defineEmits<{
    confirm: [result: ConfirmModalResult];
    cancel: [];
}>();

const inputValue = ref<string>("");
</script>

<template>
    <Dialog>
        <DialogTrigger :as-child="true">
            <slot/>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ modalOptions.title }}</DialogTitle>
                <DialogDescription>
                    {{ modalOptions.message }}
                </DialogDescription>
            </DialogHeader>

            <div
                v-if="modalOptions.inputType === 'text'"
                class="grid gap-4 py-4"
            >
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="confirmInput" class="text-right">
                        {{ m.mean_mean_badger_inspire() }}
                    </Label>
                    <Input
                        id="confirmInput"
                        v-model="inputValue"
                        class="col-span-3"
                    />
                </div>
            </div>

            <div
                v-else-if="modalOptions.inputType === 'textarea'"
                class="grid gap-4 py-4"
            >
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="confirmTextarea" class="text-right">
                        {{ m.mean_mean_badger_inspire() }}
                    </Label>
                    <Textarea
                        id="confirmTextarea"
                        v-model="inputValue"
                        class="col-span-3"
                    />
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" @click="() => emit('cancel')">
                    {{ modalOptions.cancelText }}
                </Button>
                <Button
                    @click="() => emit('confirm', {
                    confirmed: true,
                    value: inputValue,
                })"
                >
                    {{ modalOptions.confirmText }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
