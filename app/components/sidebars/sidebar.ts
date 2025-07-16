import { BedSingle, Bell, Globe, House, MapIcon } from "lucide-vue-next";
import type { SidebarConfig } from "~/types/sidebar";
import * as m from "~~/paraglide/messages.js";

export const sidebarConfig: SidebarConfig = {
    navMain: [],
    other: [
        {
            title: m.bland_chunky_sparrow_propel(),
            url: "/home",
            icon: House,
            requiresLogin: true,
        },
        {
            title: m.lost_trick_dog_grace(),
            url: "/public",
            icon: MapIcon,
            requiresLogin: false,
        },
        {
            title: m.crazy_game_parrot_pave(),
            url: "/local",
            icon: BedSingle,
            requiresLogin: false,
        },
        {
            title: m.real_tame_moose_greet(),
            url: "/global",
            icon: Globe,
            requiresLogin: false,
        },
        {
            title: m.that_patchy_mare_snip(),
            url: "/notifications",
            icon: Bell,
            requiresLogin: true,
        },
    ],
};
