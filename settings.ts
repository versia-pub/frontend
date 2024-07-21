export enum SettingType {
    String = "string",
    Boolean = "boolean",
    Enum = "enum",
    Float = "float",
    Integer = "integer",
    Code = "code",
}

export type Setting<T = SettingType> = {
    id: string;
    title: string;
    description: string;
    notImplemented?: boolean;
    type: T;
    value: T extends SettingType.String | SettingType.Code
        ? string
        : T extends SettingType.Boolean
          ? boolean
          : T extends SettingType.Float | SettingType.Integer
            ? number
            : T extends SettingType.Enum
              ? string
              : never;
    min?: T extends SettingType.Float | SettingType.Integer ? number : never;
    max?: T extends SettingType.Float | SettingType.Integer ? number : never;
    step?: T extends SettingType.Float | SettingType.Integer ? number : never;
    options?: T extends SettingType.Enum ? string[] : never;
    language?: T extends SettingType.Code ? string : never;
    path: SettingPages;
};

export enum SettingPages {
    Account = "account",
    Behaviour = "behaviour",
    Advanced = "advanced",
    Appearance = "appearance",
}

export const getSettingsForPath = (
    settingsToFilterIn: Settings,
    path: SettingPages,
) => settingsToFilterIn.filter((setting) => setting.path === path);

export const getSettingById = (settingsToFilterIn: Settings, id: SettingIds) =>
    settingsToFilterIn.find((setting) => setting.id === id);

export const parseFromJson = (json: Record<string, unknown>) => {
    const finalSettings = structuredClone(settings);

    // Override the default values with the values from the JSON except for the user value
    for (const setting of finalSettings) {
        if (setting.id in json) {
            setting.value = json[setting.id] as (typeof setting)["value"];
        }
    }

    return finalSettings;
};

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
}

export const settings = [
    {
        id: SettingIds.Mfm,
        title: "Render MFM",
        description: "Render Misskey-Flavoured Markdown",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
        notImplemented: true,
    } as Setting<SettingType.Boolean>,
    {
        id: SettingIds.CustomCSS,
        title: "Custom CSS",
        description: "Custom CSS for the UI",
        type: SettingType.Code,
        value: "",
        language: "css",
        path: SettingPages.Appearance,
    } as Setting<SettingType.Code>,
    {
        id: SettingIds.Theme,
        title: "Theme",
        description: "UI theme",
        type: SettingType.Enum,
        value: "dark",
        options: ["light", "dark"],
        path: SettingPages.Appearance,
    } as Setting<SettingType.Enum>,
    {
        id: SettingIds.CustomEmojis,
        title: "Render Custom Emojis",
        description: "Render custom emojis",
        type: SettingType.Boolean,
        value: true,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: SettingIds.ShowContentWarning,
        title: "Show Content Warning",
        description: "Show content warnings on notes marked sensitive/spoiler",
        type: SettingType.Boolean,
        value: true,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: SettingIds.PopupAvatarHover,
        title: "Popup Profile Hover",
        description: "Show profile popup when hovering over a user's avatar",
        type: SettingType.Boolean,
        value: true,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: SettingIds.InfiniteScroll,
        title: "Infinite Scroll",
        description:
            "Automatically load more notes when reaching the bottom of the page",
        type: SettingType.Boolean,
        value: true,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: SettingIds.ConfirmDelete,
        title: "Confirm Delete",
        description: "Confirm before deleting a note",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
        notImplemented: true,
    } as Setting<SettingType.Boolean>,
    {
        id: SettingIds.ConfirmFollow,
        title: "Confirm Follow",
        description: "Confirm before following/unfollowing a user",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
        notImplemented: true,
    } as Setting<SettingType.Boolean>,
    {
        id: SettingIds.ConfirmReblog,
        title: "Confirm Reblog",
        description: "Confirm before reblogging a note",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
        notImplemented: true,
    } as Setting<SettingType.Boolean>,
    {
        id: SettingIds.ConfirmFavourite,
        title: "Confirm Favourite",
        description: "Confirm before favouriting a note",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
        notImplemented: true,
    } as Setting<SettingType.Boolean>,
];

export type Settings = typeof settings;
