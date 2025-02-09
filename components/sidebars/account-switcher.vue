<template>
    <Drawer v-if="isMobile">
        <DrawerTrigger :as-child="true">
            <slot />
        </DrawerTrigger>
        <DrawerContent>
            <Button @click="switchAccount(identity.account.id)" variant="outline" size="lg"
                :href="`/@${identity.account.username}`" v-for="identity of identities"
                class="flex w-full items-center gap-2 px-4 text-left h-20">
                <Avatar class="size-12" :src="identity.account.avatar" :name="identity.account.display_name" />
                <div class="grid flex-1 text-left leading-tight">
                    <span class="truncate font-semibold" v-render-emojis="identity.account.emojis">{{
                        identity.account.display_name
                    }}</span>
                    <span class="truncate text-sm">@{{
                        identity.account.acct
                    }}</span>
                </div>
            </Button>
            <Button variant="secondary" size="lg" class="w-full" @click="signInAction">
                <UserPlus />
                {{ m.sunny_pink_hyena_walk() }}
            </Button>
            <Button variant="secondary" size="lg" @click="signOut()" v-if="identity">
                <LogOut />
                {{ m.sharp_big_mallard_reap() }}
            </Button>
            <Button variant="secondary" size="lg" :as="NuxtLink" href="/register" v-else>
                <LogIn />
                {{ m.honest_few_baboon_pop() }}
            </Button>
        </DrawerContent>
    </Drawer>
    <DropdownMenu v-else>
        <DropdownMenuTrigger :as-child="true">
            <slot />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded" side="bottom"
            align="end" :side-offset="4">
            <DropdownMenuLabel class="p-0 font-normal">
                <Button @click="switchAccount(identity.account.id)" variant="ghost" size="lg"
                    :href="`/@${identity.account.username}`" v-for="identity of identities"
                    class="flex w-full items-center gap-2 px-1 text-left text-sm">
                    <Avatar class="size-8" :src="identity.account.avatar" :name="identity.account.display_name" />
                    <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-semibold" v-render-emojis="identity.account.emojis">{{
                            identity.account.display_name
                            }}</span>
                        <span class="truncate text-xs">@{{
                            identity.account.acct
                            }}</span>
                    </div>
                </Button>
                <DropdownMenuItem @click="signInAction">
                    <UserPlus />
                    {{ m.sunny_pink_hyena_walk() }}
                </DropdownMenuItem>
            </DropdownMenuLabel>
            <DropdownMenuSeparator v-if="identity" />
            <DropdownMenuGroup v-if="identity">
                <DropdownMenuItem :as="NuxtLink" :href="`/@${identity.account.username}`">
                    <BadgeCheck />
                    {{ m.factual_arable_jurgen_endure() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="signOut()" v-if="identity">
                <LogOut />
                {{ m.sharp_big_mallard_reap() }}
            </DropdownMenuItem>
            <DropdownMenuItem :as="NuxtLink" href="/register" v-else>
                <LogIn />
                {{ m.honest_few_baboon_pop() }}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { BadgeCheck, LogIn, LogOut, UserPlus } from "lucide-vue-next";
import { toast } from "vue-sonner";
import * as m from "~/paraglide/messages.js";
import { NuxtLink } from "#components";
import DrawerContent from "../modals/drawer-content.vue";
import Avatar from "../profiles/avatar.vue";
import { Button } from "../ui/button";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const appData = useAppData();
const isMobile = useMediaQuery("(max-width: 768px)");

const signInAction = () => signIn(appData, new URL(useBaseUrl().value));

const signOut = async (userId?: string) => {
    const id = toast.loading("Signing out...");

    if (!(appData.value && identity.value)) {
        toast.dismiss(id);
        toast.error("No app or identity data to sign out");
        return;
    }

    const identityToRevoke = userId
        ? identities.value.find((i) => i.account.id === userId)
        : identity.value;

    if (!identityToRevoke) {
        toast.dismiss(id);
        toast.error("No identity to revoke");
        return;
    }

    // Don't do anything on error, as Versia Server doesn't implement the revoke endpoint yet
    await client.value
        ?.revokeToken(
            appData.value.client_id,
            identityToRevoke.tokens.access_token,
            identityToRevoke.tokens.access_token,
        )
        .catch(() => {
            // Do nothing
        });

    if (!userId) {
        identity.value = null;
        await navigateTo("/");
        return;
    }

    identities.value = identities.value.filter((i) => i.id !== userId);
    toast.dismiss(id);
    toast.success("Signed out");
};

const switchAccount = async (userId: string) => {
    if (userId === identity.value?.account.id) {
        return await navigateTo(`/@${identity.value.account.username}`);
    }

    const id = toast.loading("Switching account...");

    const identityToSwitch = identities.value.find(
        (i) => i.account.id === userId,
    );

    if (!identityToSwitch) {
        toast.dismiss(id);
        toast.error("No identity to switch to");
        return;
    }

    identity.value = identityToSwitch;
    toast.dismiss(id);
    toast.success("Switched account");

    window.location.href = "/";
};
</script>
