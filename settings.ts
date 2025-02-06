import * as m from "~/paraglide/messages.js";
import { setLanguageTag } from "./paraglide/runtime";

export enum SettingType {
    String = "string",
    Boolean = "boolean",
    Enum = "enum",
    Float = "float",
    Integer = "integer",
    Code = "code",
}

export type Setting = {
    title: () => string;
    description: () => string;
    notImplemented?: boolean;
    type: SettingType;
    value: unknown;
    page: SettingPages;
};

export type StringSetting = Setting & {
    type: SettingType.String;
    value: string;
};

export type BooleanSetting = Setting & {
    type: SettingType.Boolean;
    value: boolean;
};

export type EnumSetting = Setting & {
    type: SettingType.Enum;
    value: string;
    options: {
        value: string;
        label: () => string;
        icon?: string;
    }[];
};

export type FloatSetting = Setting & {
    type: SettingType.Float;
    value: number;
    min: number;
    max: number;
    step: number;
};

export type IntegerSetting = Setting & {
    type: SettingType.Integer;
    value: number;
    min: number;
    max: number;
    step: number;
};

export type CodeSetting = Setting & {
    type: SettingType.Code;
    value: string;
    language: string;
};

export enum SettingPages {
    Account = "account",
    Emojis = "emojis",
    Behaviour = "behaviour",
    Appearance = "appearance",
}

export enum SettingIds {
    Language = "language",
    Mfm = "mfm",
    CustomCSS = "custom-css",
    Theme = "theme",
    CustomEmojis = "custom-emojis",
    ShowContentWarning = "show-content-warning",
    PopupAvatarHover = "popup-avatar-hover",
    InfiniteScroll = "infinite-scroll",
    ConfirmDelete = "confirm-delete",
    ConfirmFollow = "confirm-follow",
    ConfirmReblog = "confirm-reblog",
    ConfirmLike = "confirm-favourite",
    CtrlEnterToSend = "ctrl-enter-to-send",
    EmojiTheme = "emoji-theme",
    BackgroundURL = "background-url",
    NotificationsSidebar = "notifications-sidebar",
    AvatarShape = "avatar-shape",
    SidebarStyle = "sidebar-style",
    DefaultVisibility = "default-visibility",
}

export const settings = (): Record<SettingIds, Setting> => {
    return {
        [SettingIds.Mfm]: {
            title: m.quaint_clear_boar_attend,
            description: m.aloof_helpful_larva_spur,
            type: SettingType.Boolean,
            value: false,
            page: SettingPages.Behaviour,
            notImplemented: true,
        } as BooleanSetting,
        [SettingIds.DefaultVisibility]: {
            title: m.loud_tense_kitten_exhale,
            description: m.vivid_last_crocodile_offer,
            type: SettingType.Enum,
            value: "public",
            options: [
                {
                    value: "public",
                    label: m.lost_trick_dog_grace,
                },
                {
                    value: "unlisted",
                    label: m.funny_slow_jannes_walk,
                },
                {
                    value: "private",
                    label: m.grassy_empty_raven_startle,
                },
                {
                    value: "direct",
                    label: m.pretty_bold_baboon_wave,
                },
            ],
            page: SettingPages.Behaviour,
        } as EnumSetting,
        [SettingIds.Language]: {
            title: m.pretty_born_jackal_dial,
            description: m.tired_happy_lobster_pet,
            type: SettingType.Enum,
            value: "en",
            options: [
                {
                    value: "en",
                    label: () =>
                        m.keen_aware_goldfish_thrive(
                            {},
                            {
                                languageTag: "en",
                            },
                        ),
                },
                {
                    value: "fr",
                    label: () =>
                        m.vivid_mellow_sawfish_approve(
                            {},
                            {
                                languageTag: "fr",
                            },
                        ),
                },
                {
                    value: "en-pt",
                    label: () => m.these_awful_ape_reside(),
                },
            ],
            page: SettingPages.Behaviour,
        } as EnumSetting,
        [SettingIds.SidebarStyle]: {
            title: m.deft_seemly_donkey_slide,
            description: m.wide_least_samuel_conquer,
            type: SettingType.Enum,
            value: "inset",
            options: [
                {
                    value: "inset",
                    label: m.fluffy_north_crow_blink,
                },
                {
                    value: "sidebar",
                    label: m.day_polite_newt_loop,
                },
                {
                    value: "floating",
                    label: m.jolly_mad_jackdaw_assure,
                },
            ],
            page: SettingPages.Appearance,
        } as EnumSetting,
        [SettingIds.AvatarShape]: {
            title: m.fit_cool_bulldog_dine,
            description: m.agent_misty_firefox_arise,
            type: SettingType.Enum,
            value: "square",
            options: [
                {
                    value: "circle",
                    label: m.polite_awful_ladybug_greet,
                },
                {
                    value: "square",
                    label: m.sad_each_cowfish_lock,
                },
            ],
            page: SettingPages.Appearance,
        } as EnumSetting,
        [SettingIds.CustomCSS]: {
            title: m.smart_awake_dachshund_view,
            description: m.loved_topical_rat_coax,
            type: SettingType.Code,
            value: "",
            language: "css",
            page: SettingPages.Appearance,
        } as CodeSetting,
        [SettingIds.Theme]: {
            title: m.hour_elegant_mink_grip,
            description: m.male_stout_florian_feast,
            type: SettingType.Enum,
            value: "dark",
            options: [
                {
                    value: "dark",
                    label: m.wise_neat_ox_buzz,
                },
                {
                    value: "light",
                    label: m.each_strong_snail_aid,
                },
                {
                    value: "system",
                    label: m.helpful_raw_seal_nurture,
                },
            ],
            page: SettingPages.Appearance,
        } as EnumSetting,
        [SettingIds.CustomEmojis]: {
            title: m.loud_raw_sheep_imagine,
            description: m.inclusive_pink_tuna_enjoy,
            type: SettingType.Boolean,
            value: true,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.ShowContentWarning]: {
            title: m.fair_swift_elephant_hunt,
            description: m.gray_minor_bee_endure,
            type: SettingType.Boolean,
            value: true,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.PopupAvatarHover]: {
            title: m.north_nimble_turkey_transform,
            description: m.bold_moving_fly_savor,
            type: SettingType.Boolean,
            value: true,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.InfiniteScroll]: {
            title: m.sleek_this_earthworm_hug,
            description: m.plane_dark_salmon_pout,
            type: SettingType.Boolean,
            value: true,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.ConfirmDelete]: {
            title: m.trite_salty_eel_race,
            description: m.helpful_early_worm_laugh,
            type: SettingType.Boolean,
            value: true,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.ConfirmFollow]: {
            title: m.jolly_empty_bullock_mend,
            description: m.calm_male_wombat_relish,
            type: SettingType.Boolean,
            value: false,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.ConfirmReblog]: {
            title: m.honest_great_rooster_taste,
            description: m.wacky_inner_osprey_intend,
            type: SettingType.Boolean,
            value: false,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.ConfirmLike]: {
            title: m.patchy_basic_alligator_inspire,
            description: m.antsy_weak_raven_treat,
            type: SettingType.Boolean,
            value: false,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.CtrlEnterToSend]: {
            title: m.equal_blue_zebra_launch,
            description: m.heavy_pink_meerkat_affirm,
            type: SettingType.Boolean,
            value: true,
            page: SettingPages.Behaviour,
        } as BooleanSetting,
        [SettingIds.EmojiTheme]: {
            title: m.weak_bad_martin_glow,
            description: m.warm_round_dove_skip,
            type: SettingType.Enum,
            value: "native",
            options: [
                {
                    value: "native",
                    label: m.slimy_sound_termite_hug,
                },
                {
                    value: "twemoji",
                    label: m.new_brave_maggot_relish,
                },
                {
                    value: "noto",
                    label: m.shy_clear_spider_cook,
                },
                {
                    value: "fluent",
                    label: m.many_tasty_midge_zoom,
                },
                {
                    value: "fluent-flat",
                    label: m.less_early_lionfish_honor,
                },
            ],
            page: SettingPages.Appearance,
        } as EnumSetting,
        [SettingIds.BackgroundURL]: {
            title: m.stock_large_marten_comfort,
            description: m.mean_weird_donkey_stab,
            type: SettingType.String,
            value: "",
            page: SettingPages.Appearance,
        } as StringSetting,
        [SettingIds.NotificationsSidebar]: {
            title: m.tired_jumpy_rook_slurp,
            description: m.wide_new_robin_empower,
            type: SettingType.Boolean,
            value: true,
            page: SettingPages.Appearance,
        } as BooleanSetting,
    };
};

export const getSettingsForPage = (page: SettingPages): Partial<Settings> => {
    return Object.fromEntries(
        Object.entries(settings()).filter(
            ([, setting]) => setting.page === page,
        ),
    );
};

/**
 * Merge a partly defined Settings object with the default settings
 * Useful when there is an update to the settings in the backend
 */
export const mergeSettings = (
    settingsToMerge: Record<SettingIds, Setting["value"]>,
): Settings => {
    const finalSettings = settings();

    for (const [key, value] of Object.entries(settingsToMerge)) {
        if (key in settings()) {
            finalSettings[key as SettingIds].value = value;
        }
    }

    return finalSettings;
};
export type Settings = ReturnType<typeof settings>;
