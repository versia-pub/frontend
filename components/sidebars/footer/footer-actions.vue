<script setup lang="ts">
import { ChevronsUpDown, DownloadCloud, Pen } from "lucide-vue-next";
import TinyCard from "~/components/profiles/tiny-card.vue";
import { Button } from "~/components/ui/button";
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";
import * as m from "~/paraglide/messages.js";
import AccountSwitcher from "../account/account-switcher.vue";
const { $pwa } = useNuxtApp();
</script>

<template>
    <SidebarFooter>
        <SidebarMenu class="gap-3">
            <SidebarMenuItem>
                <AccountSwitcher>
                    <SidebarMenuButton size="lg">
                        <TinyCard
                            v-if="identity"
                            :account="identity.account"
                            :domain="identity.instance.domain"
                            naked
                        />
                        <ChevronsUpDown class="ml-auto size-4" />
                    </SidebarMenuButton>
                </AccountSwitcher>
            </SidebarMenuItem>
            <SidebarMenuItem class="flex flex-col gap-2">
                <Button
                    v-if="identity"
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
