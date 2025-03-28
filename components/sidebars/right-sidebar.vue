<template>
    <Sidebar
        side="right"
        collapsible="none"
        class="hidden md:flex"
        style="--sidebar-width: 24rem; --sidebar-width-mobile: 18rem"
    >
        <SidebarContent class="overflow-y-auto *:p-2 *:gap-2">
            <NotificationsTimeline />
        </SidebarContent>
    </Sidebar>
</template>

<script setup lang="ts">
import NotificationsTimeline from "~/components/timelines/notifications.vue";
import { Sidebar, SidebarContent } from "~/components/ui/sidebar";
</script>
