<template>
    <Sidebar collapsible="offcanvas">
        <InstanceHeader />
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>{{
                    m.trite_real_sawfish_drum()
                }}</SidebarGroupLabel>
                <NavItems
                    :items="
                        sidebarConfig.other.filter((i) =>
                            i.requiresLogin ? !!identity : true
                        )
                    "
                />
            </SidebarGroup>
        </SidebarContent>
        <FooterActions />
        <SidebarRail />
    </Sidebar>
</template>

<script lang="ts" setup>
import { sidebarConfig } from "~/components/sidebars/sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarRail,
} from "~/components/ui/sidebar";
import * as m from "~~/paraglide/messages.js";
import FooterActions from "./footer/footer-actions.vue";
import InstanceHeader from "./instance/instance-header.vue";
import NavItems from "./navigation/nav-items.vue";
</script>
