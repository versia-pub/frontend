<template>
    <div class="flex min-h-screen flex-col justify-center py-12 lg:px-8 relative">
        <div v-if="account" class="mx-auto max-w-lg w-full rounded ring-1 ring-white/10 pb-10">
            <div class="w-full aspect-[8/3] border-b border-white/10 bg-dark-700">
                <img v-if="account.header" :src="account.header" class="object-cover w-full h-full" />
            </div>

            <div class="flex items-start justify-between px-4 py-3">
                <img class="-mt-[4.5rem] h-32 w-32 cursor-pointer rounded ring-white/10 ring-1 bg-dark-700"
                    :src="account.avatar" />
                <ButtonsSecondary>Edit Profile</ButtonsSecondary>
            </div>

            <div class="mt-2 px-4">
                <h2
                    class="text-xl font-bold text-gray-100 tracking-tight bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text">
                    {{ account.display_name }}
                    <Icon v-if="account.locked" name="tabler:lock" class="w-5 h-5 mb-0.5 text-gray-400 cursor-pointer"
                        title="This account manually approves its followers" />
                </h2>
                <span class="text-gray-400">@{{ account.acct }}</span>
            </div>

            <div class="mt-4 px-4">
                <div class="prose prose-invert" v-html="account.note"></div>
            </div>

            <div class="mt-3 flex items-center space-x-4 px-4">
                <div class="flex items-center space-x-1">
                    <Icon name="tabler:calendar" class="w-5 h-5 text-gray-400" />
                    <span class="text-gray-400">Created {{ formattedJoin }}</span>
                </div>
                <div v-if="account.bot" class="flex items-center space-x-1">
                    <Icon name="tabler:robot" class="w-5 h-5 text-gray-400" />
                    <span class="text-gray-400">Bot</span>
                </div>
            </div>

            <div class="mt-3 flex items-center space-x-4 px-4">
                <div class="cursor-pointer hover:underline space-x-1">
                    <span class="font-bold text-gray-200">{{ account.following_count }}</span>
                    <span class="text-gray-400">Following</span>
                </div>
                <div class="cursor-pointer hover:underline space-x-1">
                    <span class="font-bold text-gray-200">{{ account.followers_count }}</span>
                    <span class="text-gray-400">Followers</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const client = await useMegalodon();
const username = (route.params.username as string).replace("@", "");
const id = await useAccountSearch(client, username);

const account = id ? await useAccount(client, id[0].id) : null;
const formattedJoin = Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
}).format(new Date(account?.created_at ?? 0));
</script>