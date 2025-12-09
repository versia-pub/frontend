<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "~/components/ui/sidebar";
import type { SidebarNavMainItem } from "~/types/sidebar";

defineProps<{
    items: SidebarNavMainItem[];
}>();
</script>

<template>
    <SidebarMenu>
        <Collapsible
            v-for="item in items"
            :key="item.title"
            as-child
            default-open
            class="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="item.title">
                        <component :is="item.icon"/>
                        {{ item.title }}
                        <ChevronRight
                            class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem
                            v-for="subItem in item.items"
                            :key="subItem.title"
                        >
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
</template>
