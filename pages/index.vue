<template>
    <div class="relative isolate px-6 pt-14 lg:px-8">

        <div class="mx-auto max-w-md py-32 sm:py-48 lg:py-56">
            <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                <div
                    class="relative rounded px-3 py-1 text-sm leading-6 text-gray-300 ring-1 ring-white/10 hover:ring-white/20">
                    You are using <span class="font-semibold text-pink-400">Lysand 0.5-dev</span>
                </div>
            </div>
            <div class="text-center">
                <h1
                    class="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text sm:text-5xl">
                    Welcome to Lysand</h1>
                <p class="mt-6 text-lg leading-8 text-gray-300">You can login to this server by pointing any
                    Mastodon
                    client at <strong class="font-bold">{{ baseUrl }}</strong></p>
                <div class="mt-10 flex items-center justify-center gap-6 md:flex-row flex-col">
                    <NuxtLink href="/public">
                        <ButtonsPrimary>
                            Public timeline
                        </ButtonsPrimary>
                    </NuxtLink>
                    <a href="https://github.com/lysand-org/lysand" target="_blank">
                        <ButtonsSecondary>
                            Create your own instance
                        </ButtonsSecondary>
                    </a>
                </div>

                <p class="mt-6 text-lg leading-8 text-gray-300">Here are some recommended clients:</p>
                <ul class="w-full mx-auto max-w-md flex flex-col gap-3 mt-4">
                    <li v-for="client of useConfig().RECOMMENDED_CLIENTS" :key="client.name" class="w-full">
                        <a :href="client.link" target="_blank"
                            class="rounded-sm ring-2 ring-white/10 px-4 py-2 w-full flex flex-row gap-3 items-center">
                            <img :src="client.icon" :alt="client.name" class="h-10 w-10" />
                            <div class="flex flex-col justify-between items-start">
                                <h2 class="font-bold text-gray-100">{{ client.name }}</h2>
                                <span class="underline text-pink-700">{{ client.link }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
                <p class="mt-6 text-lg leading-8 text-gray-300">
                    Many other clients exist, but <strong class="font-bold">they may have not been tested for
                        compatibility</strong>. Bug reports are nevertheless welcome.
                </p>

                <p class="mt-6 text-lg leading-8 text-gray-300">
                    Found a problem? Report it on <a href="https://github.com/lysand-org/lysand/issues/new/choose"
                        target="_blank" class="underline text-pink-800">the issue tracker</a>.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const baseUrl = useBaseUrl();

useServerSeoMeta({
    title: "Welcome to Lysand!",
});
</script>