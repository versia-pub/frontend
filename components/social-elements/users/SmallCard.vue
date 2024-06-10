<template>
    <component :is="disableLink ? 'div' : NuxtLink" :href="accountUrl" class="flex flex-row">
        <Skeleton :enabled="!account" shape="rect" class="!h-12 w-12">
            <div class="shrink-0">
                <AvatarsCentered class="h-12 w-12 rounded ring-1 ring-white/5" :src="account?.avatar"
                    :alt="`${account?.acct}'s avatar'`" />
            </div>
        </Skeleton>
        <div class="flex flex-col items-start justify-around ml-4 grow overflow-hidden">
            <div class="flex flex-row items-center justify-between w-full">
                <div class="font-semibold text-gray-200 line-clamp-1 break-all">
                    <Skeleton :enabled="!account" :min-width="90" :max-width="170" shape="rect">
                        {{
        account?.display_name }}
                    </Skeleton>
                </div>
            </div>
            <span class="text-gray-400 text-sm line-clamp-1 break-all w-full">
                <Skeleton :enabled="!account" :min-width="130" :max-width="250" shape="rect">
                    @{{
        account?.acct
                    }}
                </Skeleton>
            </span>
        </div>
    </component>
</template>

<script lang="ts" setup>
import type { Account } from "~/types/mastodon/account";
import { NuxtLink } from "#components";

const props = defineProps<{
    account?: Account;
    disableLink?: boolean;
}>();

const accountUrl = props.account && `/@${props.account.acct}`;
</script>