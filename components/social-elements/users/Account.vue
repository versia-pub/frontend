<template>
    <div class="w-full ring-1 ring-inset ring-white/5 pb-10 bg-dark-800">
        <Avatar :src="account?.header" :alt="`${account?.acct}'s header image'`"
            class="w-full aspect-[8/3] border-b border-white/10 bg-dark-700 !rounded-none" />

        <div class="flex items-start justify-between px-4 py-3">
            <Avatar :src="account?.avatar" :alt="`${account?.acct}'s avatar'`"
                class="h-32 w-32 -mt-[4.5rem] z-10 shrink-0 rounded ring-2 ring-dark-800" />

            <div class="flex gap-x-2">
                <Button theme="secondary" v-if="account && account?.id === identity?.account?.id">Edit Profile
                </Button>
                <Button theme="secondary" :loading="isLoading" @click="follow()"
                    v-if="account && account?.id !== identity?.account?.id && relationship && !relationship.following && !relationship.requested">
                    <span>Follow</span>
                </Button>
                <Button theme="secondary" :loading="isLoading" @click="unfollow()"
                    v-if="account && account?.id !== identity?.account?.id && relationship && relationship.following">
                    <span>Unfollow</span>
                </Button>
                <Button theme="secondary" :loading="isLoading" :disabled="true"
                    v-if="account && account?.id !== identity?.account?.id && relationship && !relationship.following && relationship.requested">
                    <span>Requested</span>
                </Button>

                <AccountActionsDropdown v-if="account && relationship" :account="account"
                    :relationship="relationship" />
            </div>
        </div>

        <div class="mt-2 px-4">
            <h2
                class="text-xl font-bold text-gray-100 tracking-tight bg-gradient-to-r from-primary-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text">
                <Skeleton :enabled="skeleton" :min-width="200" :max-width="350" class="h-6">
                    <span v-html="display_name"></span>
                    <iconify-icon v-if="account?.locked" icon="tabler:lock" width="1.25rem" height="1.25rem"
                        class="text-gray-400 cursor-pointer align-text-top ml-1"
                        title="This account manually approves its followers" />
                </Skeleton>
            </h2>
            <span class="text-gray-300 block mt-2">
                <Skeleton :enabled="skeleton" :min-width="130" :max-width="250">@{{ account?.acct }}</Skeleton>
            </span>
            <div class="flex flex-row flex-wrap gap-4 mt-4" v-if="isDeveloper || visibleRoles.length > 0">
                <Badge v-for="role of visibleRoles" :key="role.id" :name="role.name" :description="role.description"
                    :img="role.icon" />
                <Badge v-if="isDeveloper" name="Lysand Developer" description="This user is a Lysand developer."
                    :verified="true" />
            </div>
        </div>

        <div class="mt-4 px-4">
            <Skeleton :enabled="true" v-if="skeleton" class="!h-6" :min-width="50" :max-width="100" width-unit="%"
                shape="rect" type="content">
            </Skeleton>
            <div class="prose prose-invert" v-html="note" v-else></div>
        </div>

        <div class="mt-3 flex items-center space-x-4 px-4">
            <div class="flex items-center space-x-1">
                <Skeleton :enabled="skeleton" :min-width="150" :max-width="150" shape="rect">
                    <iconify-icon icon="tabler:calendar" width="1.25rem" height="1.25rem" class="text-gray-400" />
                    <span class="text-gray-400">Created {{ formattedJoin }}</span>
                </Skeleton>
            </div>
            <div v-if="account?.bot" class="flex items-center space-x-1">
                <iconify-icon icon="tabler:robot" width="1.25rem" height="1.25rem" class="text-gray-400" />
                <span class="text-gray-400">Bot</span>
            </div>
        </div>

        <div class="mt-3 flex items-center space-x-4 px-4">
            <div class="cursor-pointer hover:underline space-x-1">
                <Skeleton :enabled="skeleton" :min-width="100" :max-width="150" shape="rect">
                    <span class="font-bold text-gray-200">{{ account?.statuses_count }}</span>
                    <span class="text-gray-400">Posts</span>
                </Skeleton>
            </div>
            <div class="cursor-pointer hover:underline space-x-1">
                <Skeleton :enabled="skeleton" :min-width="100" :max-width="150" shape="rect">
                    <span class="font-bold text-gray-200">{{ account?.following_count }}</span>
                    <span class="text-gray-400">Following</span>
                </Skeleton>
            </div>
        </div>

        <div v-if="!skeleton && fields && fields.length > 0" class="mt-4 px-4 flex-col flex space-y-3">
            <div v-for="field of fields" :key="field.name" class="flex flex-col gap-1">
                <span class="text-primary-500 font-semibold" v-html="field.name"></span>
                <span class="text-gray-200 prose prose-invert break-all" v-html="field.value"></span>
            </div>
        </div>

        <div v-else-if="skeleton" class="mt-4 px-4 flex-col space-y-3">
            <div v-for="_ of 3" class="flex flex-col gap-1">
                <Skeleton :enabled="skeleton" :min-width="10" :max-width="100" width-unit="%" shape="rect">
                </Skeleton>
                <Skeleton :enabled="skeleton" :min-width="10" :max-width="100" width-unit="%" shape="rect">
                </Skeleton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Account } from "@lysand-org/client/types";
import Avatar from "~/components/avatars/avatar.vue";
import Skeleton from "~/components/skeleton/Skeleton.vue";
import Button from "~/packages/ui/components/buttons/button.vue";
import AccountActionsDropdown from "./AccountActionsDropdown.vue";
import Badge from "./Badge.vue";

const props = defineProps<{
    account?: Account;
}>();

const account = ref(props.account);

watch(props, () => {
    account.value = props.account;
});

const skeleton = computed(() => !account.value);
const config = useConfig();
const accountId = computed(() => account.value?.id ?? null);
const { relationship, isLoading } = useRelationship(client, accountId);

const follow = () => {
    if (!(identity.value && account.value && relationship.value)) {
        return;
    }
    relationship.value = {
        ...relationship.value,
        following: true,
    };
};

const unfollow = () => {
    if (!(identity.value && account.value && relationship.value)) {
        return;
    }
    relationship.value = {
        ...relationship.value,
        following: false,
    };
};

const formattedJoin = computed(() =>
    Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(new Date(account.value?.created_at ?? 0)),
);

const handle = computed(() => {
    if (!account.value?.acct.includes("@")) {
        return `${account.value?.acct}@${new URL(useBaseUrl().value).host}`;
    }
    return account.value?.acct;
});
const isDeveloper = computed(() =>
    config.DEVELOPER_HANDLES.includes(handle.value),
);
const visibleRoles = computed(
    () => account.value?.roles.filter((r) => r.visible) ?? [],
);

const { display_name, fields, note } = useParsedAccount(
    computed(() => account.value),
    settings,
);
</script>