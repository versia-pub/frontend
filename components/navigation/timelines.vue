<template>
    <Tabs v-model:model-value="current">
        <TabsList>
            <TabsTrigger v-for="timeline in timelines.filter(
                i => i.requiresLogin ? !!identity : true,
            )" :key="timeline.value" :value="timeline.value" :as="NuxtLink" :href="timeline.url">
                {{ timeline.name }}
            </TabsTrigger>
        </TabsList>
    </Tabs>
</template>

<script lang="ts" setup>
import { BedSingle, Globe, House, MapIcon } from "lucide-vue-next";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import * as m from "~/paraglide/messages.js";
import { NuxtLink } from "#components";

const timelines = [
    {
        name: m.bland_chunky_sparrow_propel(),
        value: "home",
        url: "/home",
        icon: House,
        requiresLogin: true,
    },
    {
        name: m.lost_trick_dog_grace(),
        value: "public",
        url: "/public",
        icon: MapIcon,
        requiresLogin: false,
    },
    {
        name: m.crazy_game_parrot_pave(),
        value: "local",
        url: "/local",
        icon: BedSingle,
        requiresLogin: false,
    },
    {
        name: m.real_tame_moose_greet(),
        value: "global",
        url: "/global",
        icon: Globe,
        requiresLogin: false,
    },
];

const { beforeEach } = useRouter();
const { path } = useRoute();

const current = computed(() => {
    if (path === "/") {
        return identity.value ? "home" : "public";
    }

    const timeline = timelines.find((i) => i.url === path);
    return timeline ? timeline.value : "public";
});
</script>
