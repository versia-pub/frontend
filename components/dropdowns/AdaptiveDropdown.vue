<template>
    <HeadlessMenu v-slot="{ close }">
        <slot name="button"></slot>

        <HeadlessMenuItems @click="close" class="fixed inset-0 z-5 bg-black/50">

        </HeadlessMenuItems>

        <transition enter-active-class="transition ease-in duration-100"
            enter-from-class="transform opacity-0 translate-y-full sm:translate-y-0 scale-95"
            enter-to-class="transform translate-y-0 opacity-100 scale-100"
            leave-active-class="transition ease-out duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <HeadlessMenuItems
                :class="['z-10 mt-2 rounded overflow-hidden bg-dark-900 shadow-lg ring-1 ring-white/10 focus:outline-none',
        isSmallScreen ? 'bottom-0 fixed inset-x-0 w-full origin-bottom' : 'absolute right-0 origin-top-right top-full min-w-56']">
                <div v-if="isSmallScreen" class="w-full bg-white/10 py-2">
                    <div class="rounded-full h-1 bg-gray-400 w-12 mx-auto"></div>
                </div>
                <slot name="items"></slot>
            </HeadlessMenuItems>
        </transition>
    </HeadlessMenu>
</template>

<script setup lang="ts">
const { width } = useWindowSize();
const isSmallScreen = computed(() => width.value < 640);
</script>