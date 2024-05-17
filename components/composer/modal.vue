<template>
    <HeadlessTransitionRoot as="template" :show="open">
        <HeadlessDialog as="div" class="relative z-50" @close="useEvent('composer:close')">
            <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/70 transition-opacity" />
            </HeadlessTransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <HeadlessTransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <HeadlessDialogPanel
                            class="relative transform rounded-lg bg-dark-700 ring-1 ring-dark-800 text-left shadow-xl transition-all sm:my-8 w-full max-w-xl">
                            <Composer v-if="instance" :instance="instance" />
                        </HeadlessDialogPanel>
                    </HeadlessTransitionChild>
                </div>
            </div>
        </HeadlessDialog>
    </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
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
const client = useMegalodon();
const tokenData = useTokenData();
const instance = useInstance();
</script>