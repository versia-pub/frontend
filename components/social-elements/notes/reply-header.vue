<template>
    <NuxtLink :href="`/@${account?.acct}`" class="mb-4 flex flex-row gap-2 items-center text-gray-300 opacity-70">
        <Skeleton :enabled="!account" shape="rect" class="!h-6" :min-width="40" :max-width="100" width-unit="%">
            <iconify-icon icon="tabler:arrow-back-up" width="1.5rem" height="1.5rem" aria-hidden="true" />
            <span class="shrink-0">Replying to</span>
            <AvatarsCentered v-if="account?.avatar" :src="account?.avatar" :alt="`${account?.acct}'s avatar'`"
                class="size-5 shrink-0 rounded ring-1 ring-white/10" />
            <strong class="line-clamp-1">{{ account?.display_name || account?.acct }}</strong>
        </Skeleton>
    </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
    account_id: string | null;
}>();

const client = useClient();
const account = useAccount(client, props.account_id);
</script>