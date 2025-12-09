<script setup lang="ts">
import InstanceSmallCard from "~/components/instance/small-card.vue";
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "~/components/ui/sidebar";

const authStore = useAuthStore();
</script>

<template>
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <NuxtLink href="/">
                    <InstanceSmallCard
                        v-if="authStore.instance"
                        :instance="authStore.instance"
                    />
                </NuxtLink>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>
</template>
