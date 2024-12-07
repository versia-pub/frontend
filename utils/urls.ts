import { languageTag } from "~/paraglide/runtime";

export const wrapUrl = (path: string) => {
    return new URL(
        path,
        identity.value
            ? `https://${identity.value.instance.domain}`
            : window.location.origin,
    ).toString();
};

export const getLanguageTag = () => {
    const tag = languageTag();

    return tag === "en-rot" ? "en" : tag;
};
