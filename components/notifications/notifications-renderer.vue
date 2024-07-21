<template>
    <Teleport to="body">
        <Toaster :toaster="toaster" v-slot="toast">
            <Toast.Root
                class="rounded-lg w-[calc(100vw-2rem)] sm:w-80 bg-dark-500 duration-200 shadow-lg ring-1 ring-white/10 p-4 [&:nth-child(n+5)]:opacity-0 data-[stack]:!opacity-100 scale-[--scale,100%] translate-x-[--x] translate-y-[--y] z-[--z-index] will-change-transform">
                <div class="grid grid-cols-[auto_1fr_auto]">
                    <div class="shrink-0 h-6 w-6">
                        <iconify-icon v-if="toast.type === 'success'" icon="tabler:check" height="none"
                            class="h-6 w-6 text-green-400" aria-hidden="true" />
                        <iconify-icon v-else-if="toast.type === 'error'" icon="tabler:alert-triangle" height="none"
                            class="h-6 w-6 text-red-400" aria-hidden="true" />
                        <iconify-icon v-else-if="toast.type === 'loading'" icon="tabler:loader" height="none"
                            class="h-6 w-6 text-primary-500 animate-spin" aria-hidden="true" />
                        <iconify-icon v-else-if="toast.type === 'info'" icon="tabler:info-circle" height="none"
                            class="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </div>
                    <div class="ml-3 flex-1 pt-0.5 shrink-0 min-w-48">
                        <Toast.Title class="text-sm font-semibold text-gray-50">{{ toast.title }}</Toast.Title>
                        <Toast.Description class="mt-1 text-sm text-gray-400">{{
                            toast.description }}</Toast.Description>
                    </div>
                    <div class="ml-4 flex shrink-0">
                        <Toast.CloseTrigger type="button" title="Close this notification"
                            class="inline-flex rounded-md text-gray-400 hover:text-gray-300 duration-200">
                            <iconify-icon icon="tabler:x" class="h-5 w-5" aria-hidden="true" />
                        </Toast.CloseTrigger>
                    </div>
                </div>
            </Toast.Root>
        </Toaster>
    </Teleport>
</template>

<script setup lang="tsx">
import { Toast, Toaster, createToaster } from "@ark-ui/vue";

const toaster = createToaster({ placement: "top-end", overlap: true, gap: 24 });

useListen("notification:new", (notification) => {
    toaster.create(notification);
});
</script>