import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import * as m from "~~/paraglide/messages.js";

const characterRegex = new RegExp(/^[a-z0-9_-]+$/);

export const formSchema = (identity: Identity) =>
    toTypedSchema(
        z.strictObject({
            banner: z
                .instanceof(File)
                .refine(
                    (v) =>
                        v.size <=
                        (identity.instance.configuration.accounts
                            .header_limit ?? Number.POSITIVE_INFINITY),
                    m.civil_icy_ant_mend({
                        size: identity.instance.configuration.accounts
                            .header_limit,
                    }),
                )
                .optional(),
            avatar: z
                .instanceof(File)
                .refine(
                    (v) =>
                        v.size <=
                        (identity.instance.configuration.accounts
                            .avatar_limit ?? Number.POSITIVE_INFINITY),
                    m.zippy_caring_raven_edit({
                        size: identity.instance.configuration.accounts
                            .avatar_limit,
                    }),
                )
                .or(z.string().url())
                .optional(),
            name: z
                .string()
                .max(
                    identity.instance.configuration.accounts
                        .max_displayname_characters,
                ),
            username: z
                .string()
                .regex(characterRegex, m.still_upper_otter_dine())
                .max(
                    identity.instance.configuration.accounts
                        .max_username_characters,
                ),
            bio: z
                .string()
                .max(
                    identity.instance.configuration.accounts
                        .max_note_characters,
                ),
            bot: z.boolean().default(false),
            locked: z.boolean().default(false),
            discoverable: z.boolean().default(true),
            fields: z.array(
                z.strictObject({ name: z.string(), value: z.string() }),
            ),
        }),
    );
