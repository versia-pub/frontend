<template>
    <header class="absolute inset-x-0 top-0 z-50">
        <div
            class="relative isolate warning-background flex items-center gap-x-6 overflow-hidden bg-dark-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 w-full">
                <p class="text-sm text-gray-50 bg-dark-900 px-2 rounded py-1">
                    <strong class="font-semibold">Warning!</strong>&nbsp;•&nbsp;This is a testing site used for
                    development, not a finished page.
                </p>
            </div>
            <div class="flex justify-end">
            </div>
        </div>
        <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <NuxtLink href="/" class="-m-1.5 p-1.5">
                    <span class="sr-only">Lysand</span>
                    <img class="h-8 w-auto" src="https://lysand.org/logo.png" alt="" />
                </NuxtLink>
            </div>
            <div class="flex lg:hidden">
                <button type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Icon name="tabler:menu-2" class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <NuxtLink v-for="item in navigation" :key="item.name" :href="item.href"
                    class="text-sm font-semibold leading-6 text-gray-50">{{ item.name }}</NuxtLink>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">

            </div>
        </nav>
        <HeadlessDialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-50" />
            <HeadlessDialogPanel
                class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-dark-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-50/10">
                <div class="flex items-center justify-between">
                    <NuxtLink href="/" class="-m-1.5 p-1.5">
                        <span class="sr-only">Lysand</span>
                        <img class="h-8 w-auto" src="https://lysand.org/logo.png" alt="" />
                    </NuxtLink>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-200" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <Icon name="tabler:x" class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-400/10">
                        <div class="space-y-2 py-6">
                            <NuxtLink v-for="item in navigation" :key="item.name" :href="item.href"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-gray-900">
                                {{
                        item.name }}</NuxtLink>
                        </div>
                    </div>
                </div>
            </HeadlessDialogPanel>
        </HeadlessDialog>
    </header>
</template>

<script lang="ts" setup>
const navigation = [
    { name: "About", href: "/" },
    { name: "Roadmap", href: "/" },
    { name: "Documentation", href: "/" },
    { name: "Team", href: "/" },
];

const mobileMenuOpen = ref(false);
</script>

<style>
.warning-background {
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9d63d' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
}
</style>