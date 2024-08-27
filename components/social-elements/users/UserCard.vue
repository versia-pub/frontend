<template>
    <HoverCard.Root :positioning="{
        placement: 'bottom',
        strategy: 'fixed',
    }" v-if="isEnabled.value" v-model:open="open" :open-delay="1000">
        <HoverCard.Trigger :as-child="true">
            <slot />
        </HoverCard.Trigger>
        <Teleport to="body" v-if="account">
            <Transition enter-active-class="transition duration-300 ease-in-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="duration-200 ease-in-out"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div class="fixed bg-black/70 inset-0 z-10 pointer-events-none" v-if="open"></div>
            </Transition>
            <HoverCard.Positioner>
                <HoverCard.Content
                    class="bg-dark-700 pb-4 w-96 z-20 overflow-y-auto rounded overflow-x-hidden ring-1 ring-white/20 shadow-xl max-h-[60vh] text-sm">
                    <Avatar :src="account.header" :alt="`${account.acct}'s header image'`"
                        class="w-full aspect-[8/3] border-b border-white/10 bg-dark-700 !rounded-none" />

                    <div class="flex items-start justify-between px-4 py-3">
                        <Avatar :src="account.avatar" :alt="`${account.acct}'s avatar'`"
                            class="h-32 w-32 -mt-[4.5rem] z-10 shrink-0 rounded ring-2 ring-dark-200" />
                    </div>

                    <div class="mt-2 px-4">
                        <h2
                            class="text-xl font-bold text-gray-100 tracking-tight bg-gradient-to-r from-primary-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text">
                            <span v-html="display_name"></span>
                            <iconify-icon v-if="account.locked" icon="tabler:lock" width="1.25rem" height="1.25rem"
                                class="text-gray-400 cursor-pointer align-text-top ml-1"
                                title="This account manually approves its followers" />
                        </h2>
                        <span class="text-gray-300 block mt-2">
                            @{{ account.acct }}
                        </span>
                        <div class="flex flex-row flex-wrap gap-4 mt-4" v-if="isDeveloper || visibleRoles.length > 0">
                            <Badge v-for="role of visibleRoles" :key="role.id" :name="role.name"
                                :description="role.description" :img="role.icon" />
                            <Badge v-if="isDeveloper" name="Versia Developer"
                                description="This user is a Versia developer." :verified="true" />
                        </div>
                    </div>

                    <div class="mt-4 px-4">
                        <div class="prose prose-invert prose-sm" v-html="note"></div>
                    </div>

                    <div class="mt-3 flex items-center space-x-4 px-4">
                        <div class="flex items-center space-x-1">
                            <iconify-icon icon="tabler:calendar" width="1.25rem" height="1.25rem"
                                class="text-gray-400" />
                            <span class="text-gray-400">Created {{ formattedJoin }}</span>
                        </div>
                        <div v-if="account.bot" class="flex items-center space-x-1">
                            <iconify-icon icon="tabler:robot" width="1.25rem" height="1.25rem" class="text-gray-400" />
                            <span class="text-gray-400">Bot</span>
                        </div>
                    </div>

                    <div class="mt-3 flex items-center space-x-4 px-4">
                        <div class="cursor-pointer hover:underline space-x-1">
                            <span class="font-bold text-gray-200">{{ account.statuses_count }}</span>
                            <span class="text-gray-400">Posts</span>
                        </div>
                        <div class="cursor-pointer hover:underline space-x-1">
                            <span class="font-bold text-gray-200">{{ account.following_count }}</span>
                            <span class="text-gray-400">Following</span>
                        </div>
                    </div>

                    <div v-if="fields && fields.length > 0" class="mt-4 px-4 flex-col flex space-y-3">
                        <div v-for="field of fields" :key="field.name ?? ''" class="flex flex-col gap-1">
                            <span class="text-primary-500 font-semibold" v-html="field.name"></span>
                            <span class="text-gray-200 prose prose-invert prose-sm break-all"
                                v-html="field.value"></span>
                        </div>
                    </div>
                </HoverCard.Content>
            </HoverCard.Positioner>
        </Teleport>
    </HoverCard.Root>
    <slot v-else />
</template>

<script setup lang="ts">
import { HoverCard } from "@ark-ui/vue";
import type { Account } from "@versia/client/types";
import Avatar from "~/components/avatars/avatar.vue";
import { SettingIds } from "~/settings";
import Badge from "./Badge.vue";

const props = defineProps<{
    account?: Account;
}>();

const config = useConfig();
const isEnabled = ref({ value: false }); // useSetting(SettingIds.PopupAvatarHover);
const open = ref(false);

const formattedJoin = computed(() =>
    Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(new Date(props.account?.created_at ?? 0)),
);

const handle = computed(() => {
    if (!props.account?.acct.includes("@")) {
        return `${props.account?.acct}@${new URL(useBaseUrl().value).host}`;
    }
    return props.account?.acct;
});
const isDeveloper = computed(() =>
    config.DEVELOPER_HANDLES.includes(handle.value),
);
const visibleRoles = computed(
    () => props.account?.roles.filter((r) => r.visible) ?? [],
);

const { display_name, fields, note } = useParsedAccount(
    computed(() => props.account),
    settings,
);
</script>