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

export type Settings = Setting[];
export enum SettingPages {
    Behaviour = "behaviour",
    Appearance = "appearance",
    Advanced = "advanced",
}

export const getSettingsForPath = (settings: Settings, path: string) =>
    settings.filter((setting) => setting.path === path);

export const getSettingById = (settings: Settings, id: string) =>
    settings.find((setting) => setting.id === id);

export const settings: Settings = [
    {
        id: "mfm",
        title: "Render MFM",
        description: "Render Misskey-Flavoured Markdown",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: "custom-css",
        title: "Custom CSS",
        description: "Custom CSS for the UI",
        type: SettingType.Code,
        value: "",
        language: "css",
        path: SettingPages.Appearance,
    } as Setting<SettingType.Code>,
    {
        id: "theme",
        title: "Theme",
        description: "UI theme",
        type: SettingType.Enum,
        value: "dark",
        options: ["light", "dark"],
        path: SettingPages.Appearance,
    } as Setting<SettingType.Enum>,
    {
        id: "custom-emojis",
        title: "Render Custom Emojis",
        description: "Render custom emojis",
        type: SettingType.Boolean,
        value: true,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: "show-content-warning",
        title: "Show Content Warning",
        description: "Show content warnings on notes marked sensitive/spoiler",
        type: SettingType.Boolean,
        value: true,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: "popup-avatar-hover",
        title: "Popup Profile Hover",
        description: "Show profile popup when hovering over a user's avatar",
        type: SettingType.Boolean,
        value: true,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: "confirm-delete",
        title: "Confirm Delete",
        description: "Confirm before deleting a note",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: "confirm-follow",
        title: "Confirm Follow",
        description: "Confirm before following/unfollowing a user",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: "confirm-reblog",
        title: "Confirm Reblog",
        description: "Confirm before reblogging a note",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
    {
        id: "confirm-favourite",
        title: "Confirm Favourite",
        description: "Confirm before favouriting a note",
        type: SettingType.Boolean,
        value: false,
        path: SettingPages.Behaviour,
    } as Setting<SettingType.Boolean>,
];
