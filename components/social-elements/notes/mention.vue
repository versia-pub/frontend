<template>
    <span
        class="shrink break-all rounded bg-pink-700/30 text-pink-200 px-2 py-1 not-prose font-semibold cursor-pointer [&:not(:last-child)]:mr-1 duration-200 hover:bg-pink-600/30">
        <img class="h-[1em] w-[1em] rounded ring-1 ring-white/5 inline align-middle mb-1 mr-1" :src="account.avatar"
            alt="" />
        {{ account.display_name }}
    </span>
</template>

<script lang="ts" setup>
import type { Account } from '~/types/mastodon/account';

const props = defineProps<{
    account: Account;
}>();
</script>