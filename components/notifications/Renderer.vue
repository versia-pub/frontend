<template>
    <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
            <TransitionGroup enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition transform ease-in duration-100"
                leave-from-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-to-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2">
                <div v-for="notification in notifications" :key="notification.id"
                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-dark-500 shadow-lg ring-1 ring-white/10">
                    <div class="p-4">
                        <div class="flex items-start">
                            <div class="shrink-0 h-6 w-6">
                                <iconify-icon v-if="notification.type === 'success'" icon="tabler:check" height="none"
                                    class="h-6 w-6 text-green-400" aria-hidden="true" />
                                <iconify-icon v-else-if="notification.type === 'error'" icon="tabler:alert-triangle"
                                    height="none" class="h-6 w-6 text-red-400" aria-hidden="true" />
                                <iconify-icon v-else-if="notification.type === 'progress'" icon="tabler:loader"
                                    height="none" class="h-6 w-6 text-pink-500 animate-spin" aria-hidden="true" />
                            </div>
                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                <p class="text-sm font-semibold text-gray-50">{{ notification.title }}</p>
                                <p class="mt-1 text-sm text-gray-400" v-if="notification.message">{{
                    notification.message }}</p>
                            </div>
                            <div class="ml-4 flex flex-shrink-0">
                                <button type="button" title="Close this notification"
                                    @click="notifications.splice(notifications.indexOf(notification), 1); notification.onDismiss?.()"
                                    class="inline-flex rounded-md text-gray-400 hover:text-gray-300 duration-200">
                                    <iconify-icon icon="tabler:x" class="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<script lang="ts" setup>
const notifications = ref<
    (NotificationEvent & {
        id: string;
    })[]
>([]);

useListen("notification:new", (n) => {
    const newNotification = {
        ...n,
        id: Math.random().toString(36).substring(7),
    };

    notifications.value.push(newNotification);

    !newNotification.persistent &&
        setTimeout(() => {
            notifications.value.splice(
                notifications.value.indexOf(newNotification),
                1,
            );
            newNotification.onDismiss?.();
        }, 5000);
});
</script>