<template>
    <div v-if="identity" class="bg-dark-800 z-0 p-6 my-5 relative overflow-hidden rounded ring-1 ring-white/5">
        <div class="sm:flex sm:items-center sm:justify-between gap-3">
            <div class="sm:flex sm:space-x-5 grow">
                <Avatar :src="identity.account.avatar"
                    class="mx-auto shrink-0 size-20 rounded overflow-hidden ring-1 ring-white/10"
                    :alt="'Your avatar'" />
                <div
                    class="mt-4 text-center flex flex-col justify-center sm:mt-0 sm:text-left bg-dark-800 py-2 px-4 rounded grow ring-1 ring-white/10">
                    <p class="text-sm font-medium text-gray-300">Welcome back,</p>
                    <p class="text-xl font-bold text-gray-50 sm:text-2xl line-clamp-1" v-html="display_name"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Avatar from "../avatars/avatar.vue";

const { display_name } = useParsedAccount(
    computed(() => identity.value?.account),
    settings,
);
</script>