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
    Emojis = "emojis",
    Behaviour = "behaviour",
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
    ConfirmLike = "confirm-favourite",
    CtrlEnterToSend = "ctrl-enter-to-send",
    EmojiTheme = "emoji-theme",
    BackgroundURL = "background-url",
    NotificationsSidebar = "notifications-sidebar",
    AvatarShape = "avatar-shape",
    SidebarStyle = "sidebar-style",
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
    [SettingIds.SidebarStyle]: {
        title: "Sidebar Style",
        description: "Style of the left sidebar.",
        type: SettingType.Enum,
        value: "inset",
        options: [
            {
                value: "inset",
                label: "Inset",
            },
            {
                value: "sidebar",
                label: "Sidebar",
            },
            {
                value: "floating",
                label: "Floating",
            },
        ],
        page: SettingPages.Appearance,
    } as EnumSetting,
    [SettingIds.AvatarShape]: {
        title: "Avatar Shape",
        description: "Shape of all user avatars.",
        type: SettingType.Enum,
        value: "square",
        options: [
            {
                value: "circle",
                label: "Round",
            },
            {
                value: "square",
                label: "Square",
            },
        ],
        page: SettingPages.Appearance,
    } as EnumSetting,
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
    } as EnumSetting,
    [SettingIds.CustomEmojis]: {
        title: "Render Custom Emojis",
        description: "Render custom emojis. Requires a page reload to apply.",
        type: SettingType.Boolean,
        value: true,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.ShowContentWarning]: {
        title: "Blur Sensitive Content",
        description: "Blur notes marked sensitive/spoiler.",
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
        value: true,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.ConfirmFollow]: {
        title: "Confirm Follow",
        description: "Confirm before following/unfollowing a user.",
        type: SettingType.Boolean,
        value: false,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.ConfirmReblog]: {
        title: "Confirm Reblog",
        description: "Confirm before reblogging a note.",
        type: SettingType.Boolean,
        value: false,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.ConfirmLike]: {
        title: "Confirm Like",
        description: "Confirm before liking a note.",
        type: SettingType.Boolean,
        value: false,
        page: SettingPages.Behaviour,
    } as BooleanSetting,
    [SettingIds.CtrlEnterToSend]: {
        title: "Ctrl+Enter to Send",
        description: "Send a note by pressing ⌘+Enter or Ctrl+Enter.",
        type: SettingType.Boolean,
        value: true,
        page: SettingPages.Behaviour,
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
    [SettingIds.NotificationsSidebar]: {
        title: "Notifications Sidebar",
        description: "Display a sidebar with notifications on desktop.",
        type: SettingType.Boolean,
        value: true,
        page: SettingPages.Appearance,
    } as BooleanSetting,
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
