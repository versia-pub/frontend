<template>
    <div class="flex flex-col p-10 gap-4">
        <div
            class="aspect-video shrink-0 w-full rounded ring-white/5 bg-dark-800 shadow overflow-hidden ring-1 hover:ring-2 duration-100">
            <img class="object-cover w-full h-full duration-150 hover:scale-[102%] ease-in-out" v-if="instance?.banner"
                alt="Instance banner" :src="instance.banner" />
        </div>

        <div class="prose prose-invert prose-sm">
            <h2 class="text-center mb-10">{{ instance?.title }}</h2>
            <div v-html="description?.content"></div>
        </div>

        <div v-if="instance?.contact_account" class="flex flex-col gap-2 mt-auto">
            <h2 class="text-gray-200 font-semibold uppercase text-xs">Administrator</h2>
            <SocialElementsUsersSmallCard :account="instance.contact_account" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const client = useMegalodon();
const instance = useInstance(client);
const description = useExtendedDescription(client);
</script>