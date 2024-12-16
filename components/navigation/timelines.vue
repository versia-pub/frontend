<template>
    <Drawer>
        <DrawerTrigger :as-child="true">
            <slot />
        </DrawerTrigger>
        <DrawerContent>
            <DrawerClose v-for="item in timelines.filter(
                i => i.requiresLogin ? !!identity : true,
            )" :key="item.name" :as-child="true">
                <Button :as="NuxtLink" :href="item.url" variant="outline" size="lg" class="w-full">
                    <component :is="item.icon" />
                    {{ item.name }}
                </Button>
            </DrawerClose>
            <DialogTitle class="sr-only">{{ m.trite_real_sawfish_drum() }}</DialogTitle>
            <DialogDescription class="sr-only">{{ m.trite_real_sawfish_drum() }}</DialogDescription>
        </DrawerContent>
    </Drawer>
</template>

<script lang="ts" setup>
import { BedSingle, Globe, House, MapIcon } from "lucide-vue-next";
import * as m from "~/paraglide/messages.js";
import { NuxtLink } from "#components";
import DrawerContent from "../modals/drawer-content.vue";
import { Button } from "../ui/button";
import { Drawer, DrawerTrigger } from "../ui/drawer";

const timelines = [
    {
        name: m.bland_chunky_sparrow_propel(),
        url: "/home",
        icon: House,
        requiresLogin: true,
    },
    {
        name: m.lost_trick_dog_grace(),
        url: "/public",
        icon: MapIcon,
        requiresLogin: false,
    },
    {
        name: m.crazy_game_parrot_pave(),
        url: "/local",
        icon: BedSingle,
        requiresLogin: false,
    },
    {
        name: m.real_tame_moose_greet(),
        url: "/global",
        icon: Globe,
        requiresLogin: false,
    },
];
</script>