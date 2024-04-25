<template>
    <div class="relative min-h-dvh flex flex-row justify-center lg:justify-between">
        <div class="max-w-md w-full hidden lg:block">

        </div>
        <div class="flex flex-col justify-center max-w-lg w-full py-32 sm:py-48 px-6 lg:px-8">
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
        <aside
            class="max-w-md max-h-dvh overflow-y-scroll w-full bg-dark-700 ring-1 ring-white/10 hidden lg:flex p-10 flex-col gap-4">
            <div
                class="aspect-video shrink-0 w-full rounded ring-white/5 bg-dark-900 shadow overflow-hidden ring-1 hover:ring-2 duration-100">
                <img class="object-cover w-full h-full duration-150 hover:scale-[102%] ease-in-out"
                    v-if="instance?.banner" :src="instance.banner" />
            </div>

            <div class="prose prose-invert prose-sm">
                <h2 class="text-center mb-10">{{ instance?.title }}</h2>
                <div v-html="description?.content"></div>
            </div>

            <div v-if="contact" class="flex flex-col gap-2 mt-auto">
                <h2 class="text-gray-200 font-semibold uppercase text-xs">Administrator</h2>
                <div class="flex flex-row">
                    <NuxtLink :href="''">
                        <img class="h-12 w-12 rounded ring-1 ring-white/5" :src="contact.avatar" alt="" />
                    </NuxtLink>
                    <div class="flex flex-col items-start justify-around ml-4 grow overflow-hidden">
                        <div class="flex flex-row items-center justify-between w-full">
                            <NuxtLink :href="''" class="font-semibold text-gray-200 line-clamp-1 break-all">
                                {{
                        contact.display_name }}
                            </NuxtLink>
                        </div>
                        <span class="text-gray-400 text-sm line-clamp-1 break-all w-full">
                            @{{
                        contact.acct
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
const baseUrl = useBaseUrl();
const client = await useMegalodon();
// TODO: Add banner to the instance
const instance = await useInstance(client);
const description = await useExtendedDescription(client);
const contact = instance?.contact_account;

useServerSeoMeta({
    title: "Welcome to Lysand!",
});
</script>