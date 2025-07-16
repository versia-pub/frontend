<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <slot />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-56">
            <DropdownMenuGroup>
                <DropdownMenuItem as="button" @click="copyText(account.username)">
                    <AtSign />
                    {{ m.cool_dark_tapir_belong() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(JSON.stringify(account, null, 4))">
                    <Code />
                    {{ m.yummy_moving_scallop_sail() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(account.id)">
                    <Hash />
                    {{ m.sunny_zany_jellyfish_pop() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem as="button" @click="copyText(url)">
                    <Link />
                    {{ m.ago_new_pelican_drip() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(account.url)">
                    <Link />
                    {{ m.solid_witty_zebra_walk() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="a" v-if="isRemote" target="_blank" rel="noopener noreferrer" :href="account.url">
                    <ExternalLink />
                    {{ m.active_trite_lark_inspire() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="isLoggedIn && !isMe" />
            <DropdownMenuGroup v-if="isLoggedIn && !isMe">
                <DropdownMenuItem as="button" @click="muteUser(account.id)">
                    <VolumeX />
                    {{ m.spare_wild_mole_intend() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="blockUser(account.id)">
                    <Ban />
                    {{ m.misty_soft_sparrow_vent() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="isRemote" />
            <DropdownMenuGroup v-if="isRemote">
                <DropdownMenuItem as="button" @click="refresh">
                    <RefreshCw />
                    {{ m.slow_chunky_chipmunk_hush() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="isLoggedIn && !isMe" />
            <DropdownMenuGroup v-if="isLoggedIn && !isMe">
                <DropdownMenuItem as="button" :disabled="true">
                    <Flag />
                    {{ m.great_few_jaguar_rise() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/schemas";
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
import type { z } from "zod";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as m from "~~/paraglide/messages.js";

const { account } = defineProps<{
    account: z.infer<typeof Account>;
}>();

const isMe = identity.value?.account.id === account.id;
const isLoggedIn = !!identity.value;

const { copy } = useClipboard();
const copyText = (text: string) => {
    copy(text);
    toast.success(m.flat_nice_worm_dream());
};

const url = wrapUrl(`/@${account.acct}`);
const isRemote = account.acct.includes("@");

const muteUser = async (userId: string) => {
    const id = toast.loading(m.ornate_tidy_coyote_grow());
    await client.value.muteAccount(userId);
    toast.dismiss(id);

    toast.success("User muted");
};

const blockUser = async (userId: string) => {
    const id = toast.loading(m.empty_smug_raven_bloom());
    await client.value.blockAccount(userId);
    toast.dismiss(id);

    toast.success("User blocked");
};

const refresh = async () => {
    const id = toast.loading(m.real_every_macaw_wish());
    await client.value.refetchAccount(account.id);
    toast.dismiss(id);

    toast.success(m.many_cool_fox_love());
};
</script>
