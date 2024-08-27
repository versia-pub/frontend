<template>
    <div class="px-4 py-20 prose prose-invert mx-auto max-w-md">
        <h2>Where is the mobile app?</h2>
        <p>Versia Server is compatible with the Mastodon API, meaning it can be used with any Mastodon-compatible
            client. This
            includes the official Mastodon app, as well as many third-party clients.</p>
        <h2>Recommended Clients</h2>
        <ul class="w-full flex flex-col gap-3 mt-4 not-prose">
            <li v-for="client of useConfig().RECOMMENDED_CLIENTS" :key="client.name" class="w-full">
                <a :href="client.link" target="_blank"
                    class="rounded-sm ring-2 ring-white/10 px-4 py-2 w-full flex flex-row gap-3 items-center">
                    <img crossorigin="anonymous" :src="client.icon" class="h-10 w-10" :alt="`${client.name}'s logo'`" />
                    <div class="flex flex-col justify-between items-start">
                        <h2 class="text-gray-100 font-semibold">{{ client.name }}</h2>
                        <span class="underline text-primary-700">{{ client.link }}</span>
                    </div>
                </a>
            </li>
        </ul>
        <p>
            Many other clients exist, but <strong class="font-bold">they have not been tested for
                compatibility</strong>. Bug reports are nevertheless welcome.
        </p>

        <h2>Main Issues</h2>
        <ul>
            <li>File uploads are inconsistent and don't work a lot of the time</li>
        </ul>

        <p>
            Found a problem? Report it on <a href="https://github.com/versia-pub/server/issues/new/choose"
                target="_blank" class="underline text-primary-700">the issue tracker</a>.
        </p>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "app",
});
</script>