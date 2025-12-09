<script setup lang="ts">
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";
import type { SidebarNavItem } from "~/types/sidebar";

defineProps<{
    items: SidebarNavItem[];
}>();
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
            <SidebarMenuButton as-child>
                <NuxtLink :href="item.url">
                    <component :is="item.icon"/>
                    <span>{{ item.title }}</span>
                </NuxtLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
