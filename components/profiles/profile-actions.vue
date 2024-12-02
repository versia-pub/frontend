<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <slot />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Profile Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem as="button" @click="copyText(account.username)">
                    <AtSign class="mr-2 size-4" />
                    <span>Copy username</span>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(JSON.stringify(account, null, 4))">
                    <Code class="mr-2 size-4" />
                    <span>Copy API data</span>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(account.id)">
                    <Hash class="mr-2 size-4" />
                    <span>Copy ID</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem as="button" @click="copyText(url)">
                    <Link class="mr-2 size-4" />
                    <span>Copy link</span>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(account.url)">
                    <Link class="mr-2 size-4" />
                    <span>Copy link (origin)</span>
                </DropdownMenuItem>
                <DropdownMenuItem as="a" v-if="isRemote" target="_blank" rel="noopener noreferrer" :href="account.url">
                    <ExternalLink class="mr-2 size-4" />
                    <span>Open on remote</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="isLoggedIn && !isMe" />
            <DropdownMenuGroup v-if="isLoggedIn && !isMe">
                <DropdownMenuItem as="button" @click="muteUser(account.id)">
                    <VolumeX class="mr-2 size-4" />
                    <span>Mute</span>
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="blockUser(account.id)">
                    <Ban class="mr-2 size-4" />
                    <span>Block</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="isRemote" />
            <DropdownMenuGroup v-if="isRemote">
                <DropdownMenuItem as="button" @click="refresh">
                    <RefreshCw class="mr-2 size-4" />
                    <span>Refresh</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="isLoggedIn && !isMe" />
            <DropdownMenuGroup v-if="isLoggedIn && !isMe">
                <DropdownMenuItem as="button" :disabled="true">
                    <Flag class="mr-2 size-4" />
                    <span>Report</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Account } from "@versia/client/types";
import {
    AtSign,
    Ban,
    Code,
    ExternalLink,
    Flag,
    Hash,
    Link,
    RefreshCw,
    VolumeX,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

const { account } = defineProps<{
    account: Account;
}>();

const isMe = identity.value?.account.id === account.id;
const isLoggedIn = !!identity.value;

const { copy } = useClipboard();
const copyText = (text: string) => {
    copy(text);
    toast.success("Copied to clipboard");
};

const url = wrapUrl(`/@${account.acct}`);
const isRemote = account.acct.includes("@");

const muteUser = async (userId: string) => {
    const id = toast.loading("Muting user...");
    await client.value.muteAccount(userId);
    toast.dismiss(id);

    toast.success("User muted");
};

const blockUser = async (userId: string) => {
    const id = toast.loading("Blocking user...");
    await client.value.blockAccount(userId);
    toast.dismiss(id);

    toast.success("User blocked");
};

const refresh = async () => {
    const id = toast.loading("Requesting refresh...");
    await client.value.refetchAccount(account.id);
    toast.dismiss(id);

    toast.success("Account refreshed");
};
</script>