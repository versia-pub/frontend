<template>
    <a :href="`/@${account.acct}`"
        class="shrink break-all rounded bg-primary-700/80 text-primary-200 px-2 py-1 not-prose font-semibold cursor-pointer [&:not(:last-child)]:mr-1 duration-200 hover:bg-primary-600/30">
        <img class="size-[1em] rounded ring-1 ring-white/5 !inline align-middle mb-1 mr-1" :src="account.avatar"
            :alt="`${account.acct}'s avatar'`" />
        {{ account.display_name }}
    </a>
</template>

<script lang="ts" setup>
import type { Account } from "@lysand-org/client/types";

defineProps<{
    account: Account;
}>();
</script>