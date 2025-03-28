<script setup lang="ts">
import Avatar from "~/components/profiles/avatar.vue";
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar";
import * as m from "~/paraglide/messages.js";

const instance = useInstance();
</script>

<template>
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <NuxtLink href="/">
                    <SidebarMenuButton size="lg">
                        <Avatar
                            class="size-8"
                            :src="
                                instance?.thumbnail?.url ??
                                'https://cdn.versia.pub/branding/icon.svg'
                            "
                            :name="instance?.title"
                        />
                        <div
                            class="grid flex-1 text-left text-sm leading-tight"
                        >
                            <span class="truncate font-semibold">
                                {{
                                    instance?.title ??
                                    m.short_zippy_felix_kick()
                                }}
                            </span>
                            <span class="truncate text-xs">
                                {{
                                    instance?.description ??
                                    m.top_active_ocelot_cure()
                                }}
                            </span>
                        </div>
                    </SidebarMenuButton>
                </NuxtLink>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>
</template>
