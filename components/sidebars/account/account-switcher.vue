<script setup lang="ts">
import { BadgeCheck, LogIn, LogOut, UserPlus } from "lucide-vue-next";
import { toast } from "vue-sonner";
import TinyCard from "~/components/profiles/tiny-card.vue";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import * as m from "~/paraglide/messages.js";
import { NuxtLink } from "#components";

const appData = useAppData();

const signInAction = async () => signIn(appData, await askForInstance());

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

<template>
    <DropdownMenu>
        <DropdownMenuTrigger :as-child="true">
            <slot />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel> Your accounts </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem
                    v-for="identity of identities"
                    :key="identity.account.id"
                    @click="switchAccount(identity.account.id)"
                    :href="`/@${identity.account.username}`"
                >
                    <TinyCard
                        :account="identity.account"
                        :domain="identity.instance.domain"
                        naked
                    />
                </DropdownMenuItem>
                <DropdownMenuItem @click="signInAction">
                    <UserPlus />
                    {{ m.sunny_pink_hyena_walk() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="identity" />
            <DropdownMenuGroup v-if="identity">
                <DropdownMenuItem
                    :as="NuxtLink"
                    :href="`/@${identity.account.username}`"
                >
                    <BadgeCheck />
                    {{ m.factual_arable_jurgen_endure() }}
                </DropdownMenuItem>
                <DropdownMenuItem @click="signOut(appData, identity)">
                    <LogOut />
                    {{ m.sharp_big_mallard_reap() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem v-else :as="NuxtLink" href="/register">
                <LogIn />
                {{ m.honest_few_baboon_pop() }}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
