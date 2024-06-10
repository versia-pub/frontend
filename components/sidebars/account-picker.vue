<template>
    <DropdownsAdaptiveDropdown>
        <template #button>
            <slot>
                <div class="rounded text-left flex flex-row gap-x-2 hover:scale-[95%] duration-100"
                    v-if="currentIdentity">
                    <div class="shrink-0">
                        <AvatarsCentered class="size-12 rounded ring-1 ring-white/5"
                            :src="currentIdentity.account.avatar" :alt="`${currentIdentity.account.acct}'s avatar'`" />
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
                <ButtonsBase v-else class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10
                overflow-hidden h-12 w-full duration-200">
                    <iconify-icon icon="tabler:login" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Sign In</span>
                </ButtonsBase>
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
                            <AvatarsCentered class="h-12 w-12 rounded ring-1 ring-white/5"
                                :src="identity.account.avatar" :alt="`${identity.account.acct}'s avatar'`" />
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
                <Menu.Item value="">
                    <button @click="$emit('signIn')" class="w-full">
                        <div class="rounded text-left flex flex-row gap-x-2 hover:scale-[95%]">
                            <div
                                class="shrink-0 size-12 border-dashed border-white/20 border flex items-center justify-center rounded">
                                <iconify-icon icon="tabler:user-plus" class="size-6 text-gray-200" width="none" />
                            </div>
                            <div
                                class="flex flex-col items-start font-semibold p-1 justify-around text-sm text-gray-300 grow overflow-hidden">
                                Add new account
                            </div>
                        </div>
                    </button>
                </Menu.Item>
            </div>
        </template>
    </DropdownsAdaptiveDropdown>
</template>

<script lang="ts" setup>
import { Menu } from "@ark-ui/vue";
const identities = useIdentities();

const currentIdentity = useCurrentIdentity();

defineEmits<{
    signIn: [];
    signOut: [identityId: string];
}>();
</script>