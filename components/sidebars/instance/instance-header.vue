<script setup lang="ts">
import InstanceSmallCard from "~/components/instance/small-card.vue";
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "~/components/ui/sidebar";

const instance = useInstance();
</script>

<template>
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <NuxtLink href="/">
                    <InstanceSmallCard v-if="instance" :instance="instance" />
                </NuxtLink>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>
</template>
