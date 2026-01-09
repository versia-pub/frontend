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
        <SidebarMenu v-if="authStore.isSignedIn">
            <SidebarMenuItem>
                <NuxtLink href="/">
                    <InstanceSmallCard :instance="authStore.instance" />
                </NuxtLink>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>
</template>
