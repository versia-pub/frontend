import * as m from "~~/paraglide/messages.js";
import {
    BooleanPreference,
    CodePreference,
    MultiSelectPreference,
    NumberPreference,
    SelectPreference,
    UrlPreference,
} from "./types";

export const preferences = {
    render_mfm: new BooleanPreference({
        name: m.quaint_clear_boar_attend(),
        description: m.aloof_helpful_larva_spur(),
        defaultValue: true,
        category: "Behaviour/Notes",
    }),
    default_visibility: new SelectPreference<
        "public" | "unlisted" | "private" | "direct"
    >({
        name: m.loud_tense_kitten_exhale(),
        description: m.vivid_last_crocodile_offer(),
        defaultValue: "public",
        options: {
            public: m.lost_trick_dog_grace(),
            unlisted: m.funny_slow_jannes_walk(),
            private: m.grassy_empty_raven_startle(),
            direct: m.pretty_bold_baboon_wave(),
        },
        category: "Behaviour/Posting",
    }),
    language: new SelectPreference<"en" | "fr">({
        name: m.pretty_born_jackal_dial(),
        description: m.tired_happy_lobster_pet(),
        defaultValue: "en",
        options: {
            en: m.keen_aware_goldfish_thrive(
                {},
                {
                    locale: "en",
                },
            ),
            fr: m.vivid_mellow_sawfish_approve(
                {},
                {
                    locale: "fr",
                },
            ),
        },
        category: "Behaviour/Globals",
    }),
    border_radius: new NumberPreference({
        name: "Border radius",
        description:
            "Global border radius that all elements inheritt from (rem units).",
        defaultValue: 0.625,
        step: 0.025,
        min: 0,
        max: 2,
        category: "Appearance/Globals",
    }),
    custom_css: new CodePreference({
        name: m.smart_awake_dachshund_view(),
        description: m.loved_topical_rat_coax(),
        defaultValue: "",
        language: "css",
        category: "Appearance/Globals",
    }),
    color_theme: new SelectPreference<"dark" | "light" | "system">({
        name: m.hour_elegant_mink_grip(),
        defaultValue: "system",
        options: {
            dark: m.wise_neat_ox_buzz(),
            light: m.each_strong_snail_aid(),
            system: m.helpful_raw_seal_nurture(),
        },
        category: "Appearance/Globals",
    }),
    custom_emojis: new BooleanPreference({
        name: m.loud_raw_sheep_imagine(),
        description: m.inclusive_pink_tuna_enjoy(),
        defaultValue: true,
        category: "Behaviour/Notes",
    }),
    show_content_warning: new BooleanPreference({
        name: m.fair_swift_elephant_hunt(),
        description: m.gray_minor_bee_endure(),
        defaultValue: true,
        category: "Behaviour/Notes",
    }),
    popup_avatar_hover: new BooleanPreference({
        name: m.north_nimble_turkey_transform(),
        description: m.bold_moving_fly_savor(),
        defaultValue: false,
        category: "Behaviour/Timelines",
    }),
    infinite_scroll: new BooleanPreference({
        name: m.sleek_this_earthworm_hug(),
        description: m.plane_dark_salmon_pout(),
        defaultValue: true,
        category: "Behaviour/Timelines",
    }),
    confirm_actions: new MultiSelectPreference<
        "delete" | "follow" | "like" | "reblog"
    >({
        name: "Confirm actions",
        description: "Confirm actions before performing them.",
        defaultValue: ["delete"],
        options: {
            delete: m.trite_salty_eel_race(),
            follow: m.jolly_empty_bullock_mend(),
            like: m.patchy_basic_alligator_inspire(),
            reblog: m.honest_great_rooster_taste(),
        },
        category: "Behaviour/Notes",
    }),
    ctrl_enter_send: new BooleanPreference({
        name: m.equal_blue_zebra_launch(),
        description: m.heavy_pink_meerkat_affirm(),
        defaultValue: true,
        category: "Behaviour/Posting",
    }),
    emoji_theme: new SelectPreference<
        "native" | "twemoji" | "noto" | "fluent" | "fluent-flat"
    >({
        name: m.weak_bad_martin_glow(),
        description: m.warm_round_dove_skip(),
        defaultValue: "native",
        options: {
            native: m.slimy_sound_termite_hug(),
            twemoji: m.new_brave_maggot_relish(),
            noto: m.shy_clear_spider_cook(),
            fluent: m.many_tasty_midge_zoom(),
            "fluent-flat": m.less_early_lionfish_honor(),
        },
        category: "Appearance/Globals",
    }),
    background_url: new UrlPreference({
        name: m.stock_large_marten_comfort(),
        description: m.mean_weird_donkey_stab(),
        defaultValue: "",
        category: "Appearance/Globals",
    }),
    display_notifications_sidebar: new BooleanPreference({
        name: m.tired_jumpy_rook_slurp(),
        description: m.wide_new_robin_empower(),
        defaultValue: true,
        category: "Appearance/Globals",
    }),
} as const;
