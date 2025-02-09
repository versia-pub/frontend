<template>
    <Sidebar collapsible="none" class="hidden md:flex">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <NuxtLink href="/">
                        <SidebarMenuButton size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar class="size-8" :src="instance?.thumbnail.url ??
                                'https://cdn.versia.pub/branding/icon.svg'
                                " :name="instance?.title" />
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">{{ instance?.title ?? m.short_zippy_felix_kick()
                                    }}</span>
                                <span class="truncate text-xs">{{ m.top_active_ocelot_cure() }}</span>
                            </div>
                            <!-- <ChevronsUpDown class="ml-auto" /> -->
                        </SidebarMenuButton>
                    </NuxtLink>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>{{ m.trite_real_sawfish_drum() }}</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem v-for="item in data.other.filter(
                        i => i.requiresLogin ? !!identity : true,
                    )" :key="item.name">
                        <SidebarMenuButton as-child>
                            <NuxtLink :href="item.url">
                                <component :is="item.icon" />
                                <span>{{ item.name }}</span>
                            </NuxtLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup v-if="identity" class="mt-auto">
                <SidebarGroupLabel>{{ m.close_short_kitten_coax() }}</SidebarGroupLabel>
                <SidebarMenu>
                    <Collapsible v-for="item in data.navMain" :key="item.title" as-child class="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger as-child>
                                <SidebarMenuButton :tooltip="item.title">
                                    <component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                    <ChevronRight
                                        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                                        <SidebarMenuSubButton as-child>
                                            <NuxtLink :href="subItem.url">
                                                <span>{{ subItem.title }}</span>
                                            </NuxtLink>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu class="gap-3">
                <SidebarMenuItem>
                    <AccountSwitcher>
                        <SidebarMenuButton size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar v-if="identity" class="size-8" :src="identity.account.avatar"
                                :name="identity.account.display_name" />
                            <Avatar v-else class="size-8" name="AB" />
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold" v-render-emojis="identity?.account.emojis">{{
                                    identity?.account.display_name ?? "Not signed in"
                                    }}</span>
                                <span class="truncate text-xs" v-if="identity">@{{ identity?.account.acct }}</span>
                            </div>
                            <ChevronsUpDown class="ml-auto size-4" />
                        </SidebarMenuButton>
                    </AccountSwitcher>
                </SidebarMenuItem>
                <SidebarMenuItem class="flex flex-col gap-2">
                    <Button variant="default" size="lg" class="w-full group-data-[collapsible=icon]:px-4"
                        v-if="identity" @click="useEvent('composer:open')">
                        <Pen />
                        <span class="group-data-[collapsible=icon]:hidden">{{ m.salty_aloof_turkey_nudge() }}</span>
                    </Button>
                    <Button variant="destructive" size="lg" class="w-full group-data-[collapsible=icon]:px-4"
                        v-if="$pwa?.needRefresh" @click="$pwa?.updateServiceWorker(true)">
                        <DownloadCloud />
                        <span class="group-data-[collapsible=icon]:hidden">{{ m.quaint_low_felix_pave() }}</span>
                    </Button>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>

<script lang="ts" setup>
import {
    BedSingle,
    Bell,
    ChevronRight,
    ChevronsUpDown,
    DownloadCloud,
    Globe,
    House,
    MapIcon,
    Pen,
    Settings2,
} from "lucide-vue-next";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "~/components/ui/sidebar";
import * as m from "~/paraglide/messages.js";
import Avatar from "../profiles/avatar.vue";
import { Button } from "../ui/button";
import AccountSwitcher from "./account-switcher.vue";

const data = {
    navMain: [
        {
            title: m.patchy_seemly_hound_grace(),
            url: "/preferences",
            icon: Settings2,
            items: [
                {
                    title: m.factual_arable_jurgen_endure(),
                    url: "/preferences/account",
                },
                {
                    title: m.tough_clean_wolf_gleam(),
                    url: "/preferences/appearance",
                },
                {
                    title: m.legal_best_tadpole_rise(),
                    url: "/preferences/behaviour",
                },
                {
                    title: m.novel_trite_sloth_adapt(),
                    url: "/preferences/emojis",
                },
                {
                    title: m.safe_green_mink_cook(),
                    url: "/preferences/roles",
                },
            ],
        },
    ],
    other: [
        {
            name: m.bland_chunky_sparrow_propel(),
            url: "/home",
            icon: House,
            requiresLogin: true,
        },
        {
            name: m.lost_trick_dog_grace(),
            url: "/public",
            icon: MapIcon,
            requiresLogin: false,
        },
        {
            name: m.crazy_game_parrot_pave(),
            url: "/local",
            icon: BedSingle,
            requiresLogin: false,
        },
        {
            name: m.real_tame_moose_greet(),
            url: "/global",
            icon: Globe,
            requiresLogin: false,
        },
        {
            name: m.that_patchy_mare_snip(),
            url: "/notifications",
            icon: Bell,
            requiresLogin: true,
        },
    ],
};

const instance = useInstance();
const { $pwa } = useNuxtApp();
</script>
