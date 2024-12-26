<script setup lang="ts">
import { ChevronDownIcon } from "lucide-vue-next";
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
        <SidebarInset>
            <header
                class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 overflow-hidden bg-background">
                <div :key="route.path" class="flex items-center gap-2 px-4 max-w-full">
                    <SidebarTrigger class="-ml-1 shrink-0" />
                    <Separator v-if="route.meta.breadcrumbs" orientation="vertical" class="mr-2 h-4" />
                    <Breadcrumb v-if="route.meta.breadcrumbs">
                        <BreadcrumbList>
                            <template v-for="(breadcrumb, index) of route.meta.breadcrumbs()">
                                <BreadcrumbItem>
                                    <component v-if="!breadcrumb.links"
                                        :is="breadcrumb.href ? BreadcrumbLink : BreadcrumbPage" :href="breadcrumb.href">
                                        {{ breadcrumb.text }}
                                    </component>
                                    <DropdownMenu v-else>
                                        <DropdownMenuTrigger class="flex items-center gap-1">
                                            {{ breadcrumb.text }}
                                            <ChevronDownIcon class="size-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem v-for="link of breadcrumb.links" :key="link.href"
                                                :as="BreadcrumbLink" :href="link.href">
                                                {{ link.text }}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator v-if="index !== (route.meta.breadcrumbs().length - 1)" />
                            </template>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Separator v-if="showTimelines" orientation="vertical" class="h-4" />
                    <Timelines v-if="showTimelines" />
                </div>
            </header>
            <div class="flex flex-1 flex-col gap-4 md:p-1 overflow-auto *:z-10">
                <slot />
            </div>
        </SidebarInset>
        <RightSidebar v-if="identity" v-show="showRightSidebar.value" />
    </SidebarProvider>
</template>
