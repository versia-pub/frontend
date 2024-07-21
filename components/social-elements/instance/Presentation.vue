<template>
    <div class="flex flex-col p-10 gap-4 h-full">
        <div
            class="aspect-video shrink-0 w-full rounded ring-white/5 bg-background-800 shadow overflow-hidden ring-1 hover:ring-2 duration-100">
            <img class="object-cover w-full h-full duration-150 hover:scale-[102%] ease-in-out"
                v-if="instance?.banner.url" alt="Instance banner" :src="instance.banner.url" />
        </div>

        <div class="prose prose-invert prose-sm">
            <h1 class="text-center mb-10 mt-5">{{ instance?.title }}</h1>
            <div v-html="description?.content"></div>
        </div>

        <div v-if="instance?.contact.account" class="flex flex-col gap-2 mt-auto">
            <h2 class="text-text-200 font-semibold uppercase text-xs">Administrator</h2>
            <SmallCard :account="instance.contact.account" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import SmallCard from "../users/SmallCard.vue";

const instance = useInstance();
const description = useExtendedDescription(client);
</script>