<template>
    <Sidebar side="right" collapsible="none" class="w-96 hidden lg:flex">
        <SidebarContent class="p-2 overflow-y-auto">
            <NotificationsTimeline />
        </SidebarContent>
        <SidebarRail />
    </Sidebar>
</template>

<script lang="ts" setup>
import NotificationsTimeline from "../timelines/notifications.vue";
import { Sidebar, SidebarContent, SidebarRail } from "../ui/sidebar";
</script>
