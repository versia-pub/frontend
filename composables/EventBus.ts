import mitt from "mitt";
import type { Attachment } from "~/types/mastodon/attachment";
import type { Status } from "~/types/mastodon/status";

export type NotificationEvent = {
    type: "error" | "success" | "progress";
    title: string;
    message?: string;
    persistent?: boolean;
    onDismiss?: () => void;
};

type ApplicationEvents = {
    "note:reply": Status;
    "note:delete": Status;
    "note:edit": Status;
    "note:like": Status;
    "note:unlike": Status;
    "note:reblog": Status;
    "note:unreblog": Status;
    "note:quote": Status;
    "composer:open": undefined;
    "composer:reply": Status;
    "composer:quote": Status;
    "composer:edit": Status;
    "composer:send": Status;
    "composer:send-edit": Status;
    "composer:close": undefined;
    "notification:new": NotificationEvent;
    "attachment:view": Attachment;
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
