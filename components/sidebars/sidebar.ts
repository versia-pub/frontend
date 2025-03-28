import {
    BedSingle,
    Bell,
    Globe,
    House,
    MapIcon,
    Settings2,
} from "lucide-vue-next";
import * as m from "~/paraglide/messages.js";
import type { SidebarConfig } from "~/types/sidebar";

export const sidebarConfig: SidebarConfig = {
    navMain: [
        {
            title: m.patchy_seemly_hound_grace(),
            url: "/preferences",
            icon: Settings2,
            items: [
                {
                    title: m.factual_arable_jurgen_endure(),
                    url: "/preferences/account",
                },
                {
                    title: m.tough_clean_wolf_gleam(),
                    url: "/preferences/appearance",
                },
                {
                    title: m.legal_best_tadpole_rise(),
                    url: "/preferences/behaviour",
                },
                {
                    title: m.novel_trite_sloth_adapt(),
                    url: "/preferences/emojis",
                },
                {
                    title: m.safe_green_mink_cook(),
                    url: "/preferences/roles",
                },
            ],
        },
    ],
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
