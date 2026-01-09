<script setup lang="ts">
import {
    ChevronsUpDown,
    Cog,
    DownloadCloud,
    Pen,
    UserPlus,
} from "lucide-vue-next";
import TinyCard from "~/components/profiles/tiny-card.vue";
import { Button } from "~/components/ui/button";
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";
import * as m from "~~/paraglide/messages.js";
import AccountManager from "../account/account-manager.vue";

const { $pwa } = useNuxtApp();
const authStore = useAuthStore();
</script>

<template>
    <SidebarFooter>
        <SidebarMenu class="gap-3">
            <SidebarMenuItem>
                <AccountManager>
                    <SidebarMenuButton
                        v-if="authStore.account && authStore.instance"
                        size="lg"
                    >
                        <TinyCard
                            :account="authStore.account"
                            :domain="authStore.instance.domain"
                            naked
                        />
                        <ChevronsUpDown class="ml-auto size-4" />
                    </SidebarMenuButton>
                    <SidebarMenuButton v-else>
                        <UserPlus />
                        {{ m.sunny_pink_hyena_walk() }}
                        <ChevronsUpDown class="ml-auto size-4" />
                    </SidebarMenuButton>
                </AccountManager>
            </SidebarMenuItem>
            <SidebarMenuItem class="flex flex-col gap-2">
                <Button
                    v-if="authStore.isSignedIn"
                    variant="default"
                    size="lg"
                    class="w-full group-data-[collapsible=icon]:px-4"
                    @click="useEvent('composer:open')"
                >
                    <Pen />
                    <span class="group-data-[collapsible=icon]:hidden">
                        {{ m.salty_aloof_turkey_nudge() }}
                    </span>
                </Button>
                <Button
                    v-if="authStore.isSignedIn"
                    size="lg"
                    variant="secondary"
                    @click="useEvent('preferences:open')"
                >
                    <Cog />
                    Preferences
                </Button>
                <Button
                    v-if="$pwa?.needRefresh"
                    variant="destructive"
                    size="lg"
                    class="w-full group-data-[collapsible=icon]:px-4"
                    @click="$pwa?.updateServiceWorker(true)"
                >
                    <DownloadCloud />
                    <span class="group-data-[collapsible=icon]:hidden">
                        {{ m.quaint_low_felix_pave() }}
                    </span>
                </Button>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarFooter>
</template>
