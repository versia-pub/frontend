<template>
    <AdaptiveDropdown>
        <template #button>
            <InteractionButton>
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:dots" class="size-5 text-gray-200"
                    aria-hidden="true" />
                <span class="sr-only">Open menu</span>
            </InteractionButton>
        </template>

        <template #items>
            <Menu.ItemGroup>
                <Menu.Item value="" v-if="isMyAccount">
                    <ButtonDropdown @click="note && useEvent('note:edit', note)" icon="tabler:pencil" class="w-full">
                        Edit
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="copy(JSON.stringify(note, null, 4))" icon="tabler:code"
                        class="w-full">
                        Copy API
                        response
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="copy(url)" icon="tabler:link" class="w-full">
                        Copy link
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="" v-if="note?.url && isRemote">
                    <ButtonDropdown @click="copy(note.url)" icon="tabler:link" class="w-full">
                        Copy link (origin)
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="" v-if="note?.url && isRemote">
                    <ButtonDropdown @click="openBlank(note.url)" icon="tabler:external-link" class="w-full">
                        View on remote
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="" v-if="isMyAccount">
                    <ButtonDropdown @click="remove" icon="tabler:backspace" :disabled="!identity"
                        class="w-full border-r-2 border-red-500">
                        Delete
                    </ButtonDropdown>
                </Menu.Item>
            </Menu.ItemGroup>
            <hr class="border-white/10 rounded" v-if="identity" />
            <Menu.ItemGroup v-if="identity">
                <Menu.Item value="">
                    <ButtonDropdown @click="note && useEvent('note:reply', note)" icon="tabler:arrow-back-up"
                        class="w-full">
                        Reply
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="likeFn" icon="tabler:heart" class="w-full" v-if="!note?.favourited">
                        Like
                    </ButtonDropdown>
                    <ButtonDropdown @click="likeFn" icon="tabler:heart-filled" class="w-full" v-else>
                        Unlike
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="reblogFn" icon="tabler:repeat" class="w-full" v-if="!note?.reblogged">
                        Reblog
                    </ButtonDropdown>
                    <ButtonDropdown @click="reblogFn" icon="tabler:repeat" class="w-full" v-else>
                        Unreblog
                    </ButtonDropdown>
                </Menu.Item>
                <Menu.Item value="">
                    <ButtonDropdown @click="note && useEvent('note:quote', note)" icon="tabler:quote" class="w-full">
                        Quote
                    </ButtonDropdown>
                </Menu.Item>
            </Menu.ItemGroup>
            <hr class="border-white/10 rounded" v-if="identity" />
            <Menu.ItemGroup v-if="identity">
                <Menu.Item value="">
                    <ButtonDropdown @click="note && useEvent('note:report', note)" icon="tabler:flag" class="w-full"
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
import { RolePermission, type Status } from "@versia/client/types";
import ButtonDropdown from "~/components/buttons/button-dropdown.vue";
import AdaptiveDropdown from "~/components/dropdowns/AdaptiveDropdown.vue";
import InteractionButton from "./interactions/button.vue";

defineProps<{
    url: string;
    remove: () => Promise<void>;
}>();

const note = defineModel<Status>("note", {
    required: true,
});

const openBlank = (url: string) => window.open(url, "_blank");
const { copy } = useClipboard();
const isMyAccount = computed(
    () => identity.value?.account.id === note.value?.account.id,
);
const isRemote = computed(() => note.value?.account.acct.includes("@"));
const permissions = usePermissions();

const likeFn = async () => {
    if (!note.value) {
        return;
    }
    if (note.value.favourited) {
        const output = await client.value.unfavouriteStatus(note.value.id);

        if (output.data) {
            note.value = output.data;
        }
    } else {
        const output = await client.value.favouriteStatus(note.value.id);

        if (output.data) {
            note.value = output.data;
        }
    }
};

const reblogFn = async () => {
    if (!note.value) {
        return;
    }
    if (note.value.reblogged) {
        const output = await client.value.unreblogStatus(note.value.id);

        if (output.data) {
            note.value = output.data;
        }
    } else {
        const output = await client.value.reblogStatus(note.value.id);

        if (output.data.reblog) {
            note.value = output.data.reblog;
        }
    }
};
</script>