<template>
    <HeadlessTransitionRoot as="template" :show="open">
        <Dialog.Root v-model:open="open" :close-on-escape="true" :close-on-interact-outside="true"
            @update:open="o => open = o">

            <Teleport to="body">
                <Dialog.Positioner
                    class="flex min-h-full items-start z-50 justify-center p-4 text-center sm:items-center sm:p-0 fixed inset-0 w-screen overflow-y-auto">
                    <HeadlessTransitionChild as="template" enter="ease-out duration-200" enter-from="opacity-0"
                        enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <Dialog.Backdrop class="fixed inset-0 bg-black/70" @click="open = false" />
                    </HeadlessTransitionChild>
                    <HeadlessTransitionChild as="template" enter="ease-out duration-200"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <Dialog.Content
                            class="relative transform overflow-hidden rounded-lg bg-dark-700 ring-1 ring-dark-800 text-left shadow-xl transition-all sm:my-8 w-full max-w-xl">
                            <Composer v-if="instance" :instance="instance" />
                        </Dialog.Content>
                    </HeadlessTransitionChild>
                </Dialog.Positioner>
            </Teleport>
        </Dialog.Root>
    </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
import { Dialog } from "@ark-ui/vue";
const open = ref(false);
useListen("note:reply", async (note) => {
    open.value = true;
    await nextTick();
    useEvent("composer:reply", note);
});
useListen("note:quote", async (note) => {
    open.value = true;
    await nextTick();
    useEvent("composer:quote", note);
});
useListen("composer:open", () => {
    if (tokenData.value) open.value = true;
});
useListen("composer:close", () => {
    open.value = false;
});
const log = console.log;
const tokenData = useTokenData();
const instance = useInstance();
</script>