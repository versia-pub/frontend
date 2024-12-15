<script setup lang="ts">
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar";
import { SettingIds } from "~/settings";
import LeftSidebar from "./left-sidebar.vue";
import RightSidebar from "./right-sidebar.vue";

const showRightSidebar = useSetting(SettingIds.NotificationsSidebar);

const route = useRoute();
</script>

<template>
    <SidebarProvider>
        <LeftSidebar />
        <SidebarInset>
            <header
                class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 overflow-hidden bg-background">
                <div class="flex items-center gap-2 px-4">
                    <SidebarTrigger class="-ml-1" />
                    <Separator orientation="vertical" class="mr-2 h-4" />
                    <Breadcrumb v-if="route.meta.breadcrumbs">
                        <BreadcrumbList>
                            <template v-for="(breadcrumb, index) of route.meta.breadcrumbs()">
                                <BreadcrumbItem class="hidden md:block">
                                    <component :is="breadcrumb.href ? BreadcrumbLink : BreadcrumbPage" :href="breadcrumb.href">
                                        {{ breadcrumb.text }}
                                    </component>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator v-if="index !== (route.meta.breadcrumbs().length - 1)"
                                    class="hidden md:block" />
                            </template>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div class="flex flex-1 flex-col gap-4 md:p-1 overflow-auto *:z-10">
                <slot />
            </div>
        </SidebarInset>
        <RightSidebar v-if="identity" v-show="showRightSidebar.value" />
    </SidebarProvider>
</template>
