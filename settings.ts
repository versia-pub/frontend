export enum SettingType {
    String = "string",
    Boolean = "boolean",
    Enum = "enum",
    Float = "float",
    Integer = "integer",
    Code = "code",
}

export type Setting = {
    title: string;
    description: string;
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
        label: string;
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
    Behaviour = "behaviour",
    Advanced = "advanced",
    Appearance = "appearance",
}

export enum SettingIds {
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
    ConfirmFavourite = "confirm-favourite",
    EmojiTheme = "emoji-theme",
    BackgroundURL = "background-url",
}

export const settings: Record<SettingIds, Setting> = {
    [SettingIds.Mfm]: {
        title: "Render MFM",
        description: "Render Misskey-Flavoured Markdown.",
        type: SettingType.Boolean,
        value: false,
        page: SettingPages.Behaviour,
        notImplemented: true,
    } as BooleanSetting,
    [SettingIds.CustomCSS]: {
        title: "Custom CSS",
        description: "Custom CSS for the UI.",
        type: SettingType.Code,
        value: "",
        language: "css",
        page: SettingPages.Appearance,
    } as CodeSetting,
    [SettingIds.Theme]: {
        title: "Theme",
        description: "UI theme.",
        type: SettingType.Enum,
        value: "dark",
        options: [
            {
                value: "dark",
                label: "Dark",
            },
            {
                value: "light",
                label: "Light",
            },
            {
                value: "system",
                label: "System",
            },
        ],
        page: SettingPages.Appearance,
        notImplemented: true,
    } as EnumSetting,
    [SettingIds.CustomEmojis]: {
        title: "Render Custom Emojis",
        description: "Render custom emojis.",
        type: SettingType.Boolean,
        value: true,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.ShowContentWarning]: {
        title: "Show Content Warning",
        description: "Show content warnings on notes marked sensitive/spoiler.",
        type: SettingType.Boolean,
        value: true,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.PopupAvatarHover]: {
        title: "Popup Profile Hover",
        description: "Show profile popup when hovering over a user's avatar.",
        type: SettingType.Boolean,
        value: true,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.InfiniteScroll]: {
        title: "Infinite Scroll",
        description:
            "Automatically load more notes when reaching the bottom of the page.",
        type: SettingType.Boolean,
        value: true,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.ConfirmDelete]: {
        title: "Confirm Delete",
        description: "Confirm before deleting a note.",
        type: SettingType.Boolean,
        value: false,
        page: SettingPages.Behaviour,
        notImplemented: true,
    } as BooleanSetting,
    [SettingIds.ConfirmFollow]: {
        title: "Confirm Follow",
        description: "Confirm before following/unfollowing a user.",
        type: SettingType.Boolean,
        value: false,
        page: SettingPages.Behaviour,
        notImplemented: true,
    } as BooleanSetting,
    [SettingIds.ConfirmReblog]: {
        title: "Confirm Reblog",
        description: "Confirm before reblogging a note.",
        type: SettingType.Boolean,
        value: false,
        page: SettingPages.Behaviour,
        notImplemented: true,
    } as BooleanSetting,
    [SettingIds.ConfirmFavourite]: {
        title: "Confirm Favourite",
        description: "Confirm before favouriting a note.",
        type: SettingType.Boolean,
        value: false,
        page: SettingPages.Behaviour,
        notImplemented: true,
    } as BooleanSetting,
    [SettingIds.EmojiTheme]: {
        title: "Emoji Theme",
        description:
            "Theme used for rendering emojis. Requires a page reload to apply.",
        type: SettingType.Enum,
        value: "native",
        options: [
            {
                value: "native",
                label: "Operating System",
            },
            {
                value: "twemoji",
                label: "Twitter Emojis",
            },
            {
                value: "noto",
                label: "Noto Emoji",
            },
            {
                value: "fluent",
                label: "Fluent Emojis",
            },
            {
                value: "fluent-flat",
                label: "Fluent Emojis (flat version)",
            },
        ],
        page: SettingPages.Appearance,
    } as EnumSetting,
    [SettingIds.BackgroundURL]: {
        title: "Background URL",
        description: "Change the background image of the site.",
        type: SettingType.String,
        value: "",
        page: SettingPages.Appearance,
    } as StringSetting,
};

export const getSettingsForPage = (page: SettingPages): Partial<Settings> => {
    return Object.fromEntries(
        Object.entries(settings).filter(([, setting]) => setting.page === page),
    );
};

/**
 * Merge a partly defined Settings object with the default settings
 * Useful when there is an update to the settings in the backend
 */
export const mergeSettings = (
    settingsToMerge: Record<SettingIds, Setting["value"]>,
): Settings => {
    const finalSettings = structuredClone(settings);

    for (const [key, value] of Object.entries(settingsToMerge)) {
        if (key in settings) {
            finalSettings[key as SettingIds].value = value;
        }
    }

    return finalSettings;
};
export type Settings = typeof settings;
