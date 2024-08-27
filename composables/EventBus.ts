import type { createToaster } from "@ark-ui/vue";
import type { Account, Attachment, Status } from "@versia/client/types";
import mitt from "mitt";
import type { Identity } from "./Identities";

export type NotificationEvent = Parameters<
    ReturnType<typeof createToaster>["create"]
>[0];

type ApplicationEvents = {
    "note:reply": Status;
    "note:delete": Status;
    "note:edit": Status;
    "note:like": Status;
    "note:unlike": Status;
    "note:reblog": Status;
    "note:unreblog": Status;
    "note:quote": Status;
    "note:report": Status;
    "composer:open": undefined;
    "composer:reply": Status;
    "composer:quote": Status;
    "composer:edit": Status;
    "composer:send": Status;
    "composer:send-edit": Status;
    "composer:close": undefined;
    "account:report": Account;
    "account:update": Account;
    "notification:new": NotificationEvent;
    "attachment:view": Attachment;
    "identity:change": Identity;
    error: {
        code: string;
        title: string;
        message: string;
    } | null;
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
