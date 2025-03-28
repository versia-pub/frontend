import type { LucideIcon } from "lucide-vue-next";
import type { Component } from "vue";

export interface SidebarNavItem {
    title: string;
    url: string;
    icon: LucideIcon;
    requiresLogin?: boolean;
}

export interface SidebarNavGroup {
    title: string;
    items: SidebarNavItem[];
}

export interface SidebarNavSubItem {
    title: string;
    url: string;
}

export interface SidebarNavMainItem {
    title: string;
    url: string;
    icon: LucideIcon;
    items: SidebarNavSubItem[];
}

export interface SidebarConfig {
    navMain: SidebarNavMainItem[];
    other: SidebarNavItem[];
}
