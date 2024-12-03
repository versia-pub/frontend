<template>
    <Sidebar variant="inset" collapsible="icon">
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
                                <span class="truncate font-semibold">{{ instance?.title ?? 'Versia Server' }}</span>
                                <span class="truncate text-xs">{{ "A Versia Server instance" }}</span>
                            </div>
                            <!-- <ChevronsUpDown class="ml-auto" /> -->
                        </SidebarMenuButton>
                    </NuxtLink>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
                <SidebarGroupLabel>More</SidebarGroupLabel>
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
                    <ThemeSwitcher />
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <AccountSwitcher />
                </SidebarMenuItem>
                <SidebarMenuItem class="flex flex-col gap-2">
                    <Button variant="default" size="lg" class="w-full group-data-[collapsible=icon]:px-4"
                        v-if="identity" @click="useEvent('composer:open')">
                        <Pen />
                        <span class="group-data-[collapsible=icon]:hidden">Compose</span>
                    </Button>
                    <Button variant="destructive" size="lg" class="w-full group-data-[collapsible=icon]:px-4"
                        v-if="$pwa?.needRefresh" @click="$pwa?.updateServiceWorker(true)">
                        <DownloadCloud />
                        <span class="group-data-[collapsible=icon]:hidden">Update</span>
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
import Avatar from "../profiles/avatar.vue";
import { Button } from "../ui/button";
import AccountSwitcher from "./account-switcher.vue";
import ThemeSwitcher from "./theme-switcher.vue";

const data = {
    navMain: [
        {
            title: "Preferences",
            url: "/preferences",
            icon: Settings2,
            items: [
                {
                    title: "Appearance",
                    url: "/preferences/appearance",
                },
                {
                    title: "Behaviour",
                    url: "/preferences/behaviour",
                },
                {
                    title: "Emojis",
                    url: "/preferences/emojis",
                },
                {
                    title: "Roles",
                    url: "/preferences/roles",
                },
            ],
        },
    ],
    other: [
        {
            name: "Home",
            url: "/home",
            icon: House,
            requiresLogin: true,
        },
        {
            name: "Public",
            url: "/public",
            icon: MapIcon,
            requiresLogin: false,
        },
        {
            name: "Local",
            url: "/local",
            icon: BedSingle,
            requiresLogin: false,
        },
        {
            name: "Global",
            url: "/global",
            icon: Globe,
            requiresLogin: false,
        },
        {
            name: "Notifications",
            url: "/notifications",
            icon: Bell,
            requiresLogin: true,
        },
    ],
};

const instance = useInstance();
const { $pwa } = useNuxtApp();
</script>