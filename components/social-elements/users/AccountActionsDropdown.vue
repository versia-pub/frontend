<template>
    <AdaptiveDropdown>
        <template #button>
            <Button theme="secondary" class="h-full">
                <iconify-icon width="unset" icon="tabler:dots" class="size-5 text-text-200" aria-hidden="true" />
                <span class="sr-only">Open menu</span>
            </Button>
        </template>

        <template #items>
            <Menu.ItemGroup>
                <Menu.Item value="">
                    <ButtonDropdown @click="copyUsername" icon="tabler:at" class="w-full">
                        Copy username
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="copyId" icon="tabler:hash" class="w-full">
                        Copy ID
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="copy(JSON.stringify(account, null, 4))" icon="tabler:code" class="w-full">
                        Copy API
                        response
                    </ButtonDropdown>
                </Menu.Item>
            </Menu.ItemGroup>
            <hr class="border-white/10 rounded" />
            <Menu.ItemGroup>
                <Menu.Item value="" v-if="isRemoteUser">
                    <ButtonDropdown @click="viewOnRemote" icon="tabler:external-link" class="w-full">
                        Open remote profile
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="copyUrl" icon="tabler:link" class="w-full">
                        Copy URL
                    </ButtonDropdown>
                </Menu.Item>
            </Menu.ItemGroup>
            <hr class="border-white/10 rounded" v-if="identity && !isMyAccount" />
            <Menu.ItemGroup v-if="identity && !isMyAccount">
                <Menu.Item value="">
                    <ButtonDropdown @click="mute" icon="tabler:volume-off" class="w-full" v-if="!relationship.muting">
                        Mute
                    </ButtonDropdown>
                    <ButtonDropdown @click="unmute" icon="tabler:volume-2" class="w-full" v-else>
                        Unmute
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="block" icon="tabler:shield-x" class="w-full" v-if="!relationship.blocking">
                        Block
                    </ButtonDropdown>
                    <ButtonDropdown @click="unblock" icon="tabler:shield-check" class="w-full" v-else>
                        Unblock
                    </ButtonDropdown>
                </Menu.Item>
            </Menu.ItemGroup>
            <hr class="border-white/10 rounded" v-if="identity && isRemoteUser" />
            <Menu.ItemGroup v-if="identity && isRemoteUser">
                <Menu.Item value="">
                    <ButtonDropdown @click="refetch" icon="tabler:refresh" class="w-full">
                        Update remote user information
                    </ButtonDropdown>
                </Menu.Item>
            </Menu.ItemGroup>
            <hr class="border-white/10 rounded" v-if="identity" />
            <Menu.ItemGroup v-if="identity">
                <Menu.Item value="">
                    <ButtonDropdown @click="useEvent('account:report', account)" icon="tabler:flag" class="w-full"
                        :disabled="!permissions.includes(RolePermission.ManageOwnReports)">
                        Report
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="" v-if="permissions.includes(RolePermission.ManageAccounts)">
                    <ButtonDropdown icon="tabler:shield-bolt" class="w-full">
                        Open moderation panel
                    </ButtonDropdown>
                </Menu.Item>
            </Menu.ItemGroup>
        </template>
    </AdaptiveDropdown>
</template>

<script lang="ts" setup>
import { Menu } from "@ark-ui/vue";
import {
    type Account,
    type Relationship,
    RolePermission,
} from "@lysand-org/client/types";
import ButtonDropdown from "~/components/buttons/button-dropdown.vue";
import AdaptiveDropdown from "~/components/dropdowns/AdaptiveDropdown.vue";
import Button from "~/packages/ui/components/buttons/button.vue";

const props = defineProps<{
    account: Account;
    relationship: Relationship;
}>();

const relationship = ref(props.relationship);

const permissions = usePermissions();
const isMyAccount = computed(
    () => identity.value?.account.id === props.account.id,
);
const isRemoteUser = computed(() => props.account.acct.includes("@"));
const { copy } = useClipboard();

const copyUsername = () => copy(props.account.acct);
const copyId = () => copy(props.account.id);
const viewOnRemote = () => window.open(props.account.url, "_blank");
const copyUrl = () => copy(props.account.url);

const mute = async () => {
    const { data } = await client.value.muteAccount(props.account.id);
    relationship.value = data;
    useEvent("notification:new", {
        type: "success",
        title: "Account muted",
        description: `You will no longer see notifications from ${props.account.acct}`,
    });
};
const unmute = async () => {
    const { data } = await client.value.unmuteAccount(props.account.id);
    relationship.value = data;
    useEvent("notification:new", {
        type: "success",
        title: "Account unmuted",
        description: `You will now see notifications from ${props.account.acct}`,
    });
};

const block = async () => {
    const { data } = await client.value.blockAccount(props.account.id);
    relationship.value = data;
    useEvent("notification:new", {
        type: "success",
        title: "Account blocked",
        description: `You will no longer see content from ${props.account.acct}`,
    });
};

const unblock = async () => {
    const { data } = await client.value.unblockAccount(props.account.id);
    relationship.value = data;
    useEvent("notification:new", {
        type: "success",
        title: "Account unblocked",
        description: `You will now see content from ${props.account.acct}`,
    });
};

const refetch = async () => {
    const { data } = await client.value.refetchAccount(props.account.id);
    useEvent("account:update", data);
    useEvent("notification:new", {
        type: "success",
        title: "Remote user information updated",
    });
};
</script>