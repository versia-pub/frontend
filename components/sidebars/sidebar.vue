<script setup lang="ts">
import { cn } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { SettingIds } from "~/settings";
import Timelines from "../navigation/timelines.vue";
import LeftSidebar from "./left-sidebar.vue";
import RightSidebar from "./right-sidebar.vue";

const showRightSidebar = useSetting(SettingIds.NotificationsSidebar);

const route = useRoute();
const isMd = useMediaQuery("(max-width: 768px)");
const showTimelines = computed(
    () =>
        ["/", "/home", "/local", "/public", "/global"].includes(route.path) &&
        isMd.value,
);
</script>

<template>
    <SidebarProvider>
        <LeftSidebar />
        <SidebarInset :class="cn('relative overflow-y-auto overflow-x-hidden', !isMd && 'pt-4')">
            <header v-if="showTimelines" class="flex h-16 items-center bg-background/80 backdrop-blur-2xl sticky top-0 inset-x-0 z-10 p-4">
                <Timelines />
            </header>
            <slot />
        </SidebarInset>
        <RightSidebar v-if="identity" v-show="showRightSidebar.value" />
    </SidebarProvider>
</template>
