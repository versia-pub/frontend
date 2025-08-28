import type { Status } from "@versia/client/schemas";
import { AtSign, Globe, Lock, LockOpen } from "lucide-vue-next";
import type { FunctionalComponent } from "vue";
import type { z } from "zod";
import * as m from "~~/paraglide/messages.js";

export const visibilities: Record<
    z.infer<typeof Status.shape.visibility>,
    {
        icon: FunctionalComponent;
        name: string;
        text: string;
    }
> = {
    public: {
        icon: Globe,
        name: m.lost_trick_dog_grace(),
        text: m.last_mean_peacock_zip(),
    },
    unlisted: {
        icon: LockOpen,
        name: m.funny_slow_jannes_walk(),
        text: m.grand_strong_gibbon_race(),
    },
    private: {
        icon: Lock,
        name: m.grassy_empty_raven_startle(),
        text: m.white_teal_ostrich_yell(),
    },
    direct: {
        icon: AtSign,
        name: m.pretty_bold_baboon_wave(),
        text: m.lucky_mean_robin_link(),
    },
};
