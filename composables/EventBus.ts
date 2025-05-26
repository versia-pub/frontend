import type { Account, Attachment, Status } from "@versia/client/schemas";
import mitt from "mitt";
import type { z } from "zod";
import type { Identity } from "./Identities";

type ApplicationEvents = {
    "note:reply": z.infer<typeof Status>;
    "note:delete": z.infer<typeof Status>;
    "note:edit": z.infer<typeof Status>;
    "note:like": z.infer<typeof Status>;
    "note:unlike": z.infer<typeof Status>;
    "note:reblog": z.infer<typeof Status>;
    "note:unreblog": z.infer<typeof Status>;
    "note:quote": z.infer<typeof Status>;
    "note:report": z.infer<typeof Status>;
    "composer:open": undefined;
    "composer:reply": z.infer<typeof Status>;
    "composer:quote": z.infer<typeof Status>;
    "composer:edit": z.infer<typeof Status>;
    "composer:send": z.infer<typeof Status>;
    "composer:send-edit": z.infer<typeof Status>;
    "composer:close": undefined;
    "account:report": z.infer<typeof Account>;
    "account:update": z.infer<typeof Account>;
    "attachment:view": z.infer<typeof Attachment>;
    "identity:change": Identity;
    "preferences:open": undefined;
    error: {
        code: string;
        title: string;
        message: string;
    } | null;
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
