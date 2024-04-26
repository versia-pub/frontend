<template>
    <aside
        class="fixed h-dvh z-20 md:flex hidden flex-col p-4 bg-dark-800 gap-10 max-w-20 hover:max-w-72 duration-200 group">
        <NuxtLink class="rounded w-11 h-11 ring-1 ring-white/10 hover:scale-105 duration-200" href="/">
            <img src="https://lysand.org/logo.png" alt="Lysand logo" />
        </NuxtLink>

        <div class="flex flex-col gap-3">
            <h3 class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Timelines</h3>
            <NuxtLink v-for="timeline in timelines" :key="timeline.href" :to="timeline.href">
                <ButtonsBase
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                    <Icon :name="timeline.icon" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">{{ timeline.name }}</span>
                </ButtonsBase>
            </NuxtLink>
        </div>

        <!-- Login buttons -->
        <div class="flex flex-col gap-3 mt-auto">
            <h3 class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Account</h3>
            <NuxtLink href="/about/apps">
                <ButtonsBase
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                    <Icon name="tabler:login" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Sign In</span>
                </ButtonsBase>
            </NuxtLink>
            <NuxtLink href="/register">
                <ButtonsBase
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                    <Icon name="tabler:certificate" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Register</span>
                </ButtonsBase>
            </NuxtLink>
        </div>
    </aside>
</template>

<script lang="ts" setup>
const timelines = ref([
    {
        href: "/public",
        name: "Public",
        icon: "tabler:world",
    },
    {
        href: "/local",
        name: "Local",
        icon: "tabler:home",
    },
]);
</script>