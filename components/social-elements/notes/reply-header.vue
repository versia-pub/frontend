<template>
    <NuxtLink :href="`/@${account?.acct}`"
        class="mb-4 flex flex-row gap-2 items-center text-gray-300 opacity-70 line-clamp-1">
        <Skeleton :enabled="!account" shape="rect" class="!h-6" :min-width="40" :max-width="100" width-unit="%">
            <Icon name="tabler:arrow-back-up" class="size-6" aria-hidden="true" />
            <span class="flex flex-row items-center gap-2 overflow-hidden flex-wrap break-all">
                Replying to
                <AvatarsCentered v-if="account?.avatar" :url="account?.avatar" :alt="`${account?.acct}'s avatar'`"
                    class="size-5 rounded inline-flex shrink-0 ring-1 ring-white/10" />
                <strong class="line-clamp-1">{{ account?.display_name || account?.acct }}</strong>
            </span>
        </Skeleton>
    </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
    account_id: string | null;
}>();

const tokenData = useTokenData();
const client = useMegalodon(tokenData);
const account = useAccount(client, props.account_id);
</script>