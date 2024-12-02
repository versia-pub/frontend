<script setup lang="ts">
import {
    BadgeCheck,
    BedSingle,
    Bell,
    ChevronRight,
    ChevronsUpDown,
    Globe,
    House,
    LogOut,
    MapIcon,
    Pen,
    Settings2,
} from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "~/components/ui/sidebar";
import NotificationsTimeline from "../timelines/notifications.vue";
import { Button } from "../ui/button";
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
        },
        {
            name: "Public",
            url: "/public",
            icon: MapIcon,
        },
        {
            name: "Local",
            url: "/local",
            icon: BedSingle,
        },
        {
            name: "Global",
            url: "/global",
            icon: Globe,
        },
        {
            name: "Notifications",
            url: "/notifications",
            icon: Bell,
        },
    ],
};

const instance = useInstance();
</script>

<template>
    <SidebarProvider>
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <NuxtLink href="/">
                            <SidebarMenuButton size="lg"
                                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                <Avatar shape="square" class="size-8">
                                    <AvatarImage :src="instance?.thumbnail.url ??
                                        'https://cdn.versia.pub/branding/icon.svg'
                                        " alt="" />
                                </Avatar>
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
                        <SidebarMenuItem v-for="item in data.other" :key="item.name">
                            <SidebarMenuButton as-child>
                                <NuxtLink :href="item.url">
                                    <component :is="item.icon" />
                                    <span>{{ item.name }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup class="mt-auto">
                    <SidebarGroupLabel>More</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible v-for="item in data.navMain" :key="item.title" as-child
                            :default-open="item.isActive" class="group/collapsible">
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
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <SidebarMenuButton size="lg"
                                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <Avatar shape="square" class="size-8">
                                        <AvatarImage :src="identity?.account.avatar" alt="" />
                                        <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold" v-render-emojis="identity?.account.emojis">{{
                                            identity?.account.display_name
                                            }}</span>
                                        <span class="truncate text-xs">@{{ identity?.account.acct }}</span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom" align="end" :side-offset="4">
                                <DropdownMenuLabel class="p-0 font-normal">
                                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar shape="square" class="size-8">
                                            <AvatarImage :src="identity?.account.avatar" alt="" />
                                            <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
                                        </Avatar>
                                        <div class="grid flex-1 text-left text-sm leading-tight">
                                            <span class="truncate font-semibold" v-render-emojis="identity?.account.emojis">{{
                                                identity?.account.display_name
                                                }}</span>
                                            <span class="truncate text-xs">@{{
                                                identity?.account.acct
                                                }}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Button variant="default" size="lg" class="w-full group-data-[collapsible=icon]:px-4" @click="useEvent('composer:open')">
                            <Pen />
                            <span class="group-data-[collapsible=icon]:hidden">Compose</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
        <SidebarInset>
            <header
                class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 overflow-hidden">
                <div class="flex items-center gap-2 px-4">
                    <SidebarTrigger class="-ml-1" />
                    <Separator orientation="vertical" class="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem class="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Timelines
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator class="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Home</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div class="flex flex-1 flex-col gap-4 md:p-1 overflow-auto *:z-10">
                <slot />
            </div>
        </SidebarInset>
        <Sidebar variant="inset" collapsible="none" side="right" class="[--sidebar-width:24rem] hidden lg:flex">
            <SidebarContent class="p-2 overflow-y-auto">
                <NotificationsTimeline />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    </SidebarProvider>
</template>
