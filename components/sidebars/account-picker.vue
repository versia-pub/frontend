<template>
    <AdaptiveDropdown>
        <template #button>
            <slot>
                <div class="rounded text-left flex flex-row gap-x-2 hover:scale-[95%] duration-100"
                    v-if="currentIdentity">
                    <div class="shrink-0">
                        <Avatar class="size-12 rounded ring-1 ring-white/5" :src="currentIdentity.account.avatar"
                            :alt="`${currentIdentity.account.acct}'s avatar'`" />
                    </div>
                    <div class="flex flex-col items-start p-1 justify-around grow overflow-hidden">
                        <div class="flex flex-row items-center justify-between w-full">
                            <div class="font-semibold text-gray-200 text-sm line-clamp-1 break-all">
                                {{
                                    currentIdentity.account.display_name }}
                            </div>
                        </div>
                        <span class="text-gray-400 text-xs line-clamp-1 break-all w-full">
                            Change account
                        </span>
                    </div>
                </div>
                <ButtonBase theme="secondary" v-else  class="w-full !justify-start">
                    <Icon icon="tabler:login" class="!size-6" />
                    <span class="shrink-0 line-clamp-1">Sign In</span>
                </ButtonBase>
            </slot>
        </template>
        <template #items>
            <div class="p-2">
                <h3 class="text-gray-400 text-xs text-center md:text-left uppercase font-semibold">Switch to account
                </h3>
            </div>
            <div class="px-2 py-4 md:py-2 flex flex-col gap-3 max-w-[100vw]">
                <Menu.Item value="" v-for="identity of identities" class="hover:scale-[95%] duration-100">
                    <div class="flex flex-row gap-x-4">
                        <div class="shrink-0" data-part="item" @click="useEvent('identity:change', identity)">
                            <Avatar class="h-12 w-12 rounded ring-1 ring-white/5" :src="identity.account.avatar"
                                :alt="`${identity.account.acct}'s avatar'`" />
                        </div>
                        <div data-part="item" class="flex flex-col items-start justify-around grow overflow-hidden"
                            @click="useEvent('identity:change', identity)">
                            <div class="flex flex-row items-center justify-between w-full">
                                <div class="font-semibold text-gray-200 line-clamp-1 break-all">
                                    {{
                                        identity.account.display_name }}
                                </div>
                            </div>
                            <span class="text-gray-400 text-sm line-clamp-1 break-all w-full">
                                @{{
                                    identity.account.acct
                                }}
                            </span>
                        </div>
                        <button data-part="item"
                            class="shrink-0 ml-6 size-12 ring-white/5 ring-1 flex items-center justify-center rounded"
                            @click="$emit('signOut', identity.id)">
                            <iconify-icon icon="tabler:logout" class="size-6 text-gray-200" width="none" />
                        </button>
                    </div>
                </Menu.Item>
                <Menu.Item value="" v-if="currentIdentity">
                    <NuxtLink href="/settings" class="w-full">
                        <ButtonBase theme="secondary" class="w-full !justify-start">
                            <Icon icon="tabler:adjustments" class="!size-6" />
                            <span class="shrink-0 line-clamp-1">Settings</span>
                        </ButtonBase>
                    </NuxtLink>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonBase @click="$emit('signIn')" theme="secondary" class="w-full !justify-start">
                        <Icon icon="tabler:user-plus" class="!size-6" />
                        <span class="shrink-0 line-clamp-1">Add new account</span>
                    </ButtonBase>
                </Menu.Item>
                <Menu.Item value="" v-if="!currentIdentity">
                    <NuxtLink href="/register" class="w-full">
                        <ButtonBase theme="secondary" class="w-full !justify-start">
                            <Icon icon="tabler:certificate" class="!size-6" />
                            <span class="shrink-0 line-clamp-1">Create new account</span>
                        </ButtonBase>
                    </NuxtLink>
                </Menu.Item>
            </div>
        </template>
    </AdaptiveDropdown>
</template>

<script lang="ts" setup>
import { Menu } from "@ark-ui/vue";
import ButtonBase from "~/packages/ui/components/buttons/button.vue";
import Icon from "~/packages/ui/components/icons/icon.vue";
import Avatar from "../avatars/avatar.vue";
import AdaptiveDropdown from "../dropdowns/AdaptiveDropdown.vue";
const identities = useIdentities();

const currentIdentity = useCurrentIdentity();

defineEmits<{
    signIn: [];
    signOut: [identityId: string];
}>();
</script>