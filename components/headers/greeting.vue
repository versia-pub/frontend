<template>
    <ClientOnly>
        <div v-if="me" class="bg-dark-800 p-6 my-5 rounded ring-1 ring-white/5">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="sm:flex sm:space-x-5">
                    <AvatarsCentered :src="me.avatar"
                        class="mx-auto shrink-0 size-20 rounded overflow-hidden ring-1 ring-white/10" />
                    <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p class="text-sm font-medium text-gray-300">Welcome back,</p>
                        <p class="text-xl font-bold text-gray-50 sm:text-2xl"
                            v-html="useParsedContent(me.display_name, []).value"></p>
                        <p class="text-sm font-medium text-gray-500">@{{ me.acct }}</p>
                    </div>
                </div>
                <div class="mt-5 flex justify-center sm:mt-0">
                    <ButtonsSecondary @click="useEvent('composer:open')">
                        Compose
                    </ButtonsSecondary>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
const me = useMe();
</script>