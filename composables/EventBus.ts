import mitt from "mitt";
import type { Status } from "~/types/mastodon/status";

type ApplicationEvents = {
    "note:reply": Status;
    "note:delete": Status;
    "note:edit": Status;
    "composer:open": undefined;
    "composer:send": Status;
    "composer:close": undefined;
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
