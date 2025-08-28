import { Client } from "@versia/client";
import type {
    Account,
    CredentialApplication,
    CustomEmoji,
    Instance,
    RolePermission,
    Token,
} from "@versia/client/schemas";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { z } from "zod";
import pkg from "~~/package.json";

/**
 * Represents an identity with associated tokens, account, instance, permissions, and emojis.
 */
export interface Identity {
    id: string;
    token: z.infer<typeof Token>;
    account: z.infer<typeof Account>;
    instance: z.infer<typeof Instance>;
    emojis: z.infer<typeof CustomEmoji>[];
}

interface AuthStoreState {
    identities: Identity[];
    activeIdentityId: string | null;
    applications: {
        [domain: string]: z.infer<typeof CredentialApplication>;
    };
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthStoreState => ({
        identities: [],
        activeIdentityId: null,
        applications: {},
    }),
    getters: {
        identity(state): Identity | null {
            return state.activeIdentityId
                ? state.identities.find(
                      (id) => id.id === state.activeIdentityId,
                  ) || null
                : null;
        },
        emojis(): z.infer<typeof CustomEmoji>[] {
            return this.identity?.emojis || [];
        },
        instance(): z.infer<typeof Instance> | null {
            return this.identity?.instance || null;
        },
        account(): z.infer<typeof Account> | null {
            return this.identity?.account || null;
        },
        application(): z.infer<typeof CredentialApplication> | null {
            if (!this.identity) {
                return null;
            }

            return this.applications[this.identity.instance.domain] || null;
        },
        token(): z.infer<typeof Token> | null {
            return this.identity?.token || null;
        },
        permissions(): RolePermission[] {
            const roles = this.account?.roles ?? [];

            return roles
                .flatMap((r) => r.permissions)
                .filter((p, i, arr) => arr.indexOf(p) === i);
        },
        isSignedIn(state): boolean {
            return state.activeIdentityId !== null;
        },
        client(): Client {
            const apiHost = window.location.origin;
            const domain = this.identity?.instance.domain;

            return new Client(
                domain ? new URL(`https://${domain}`) : new URL(apiHost),
                this.identity?.token.access_token ?? undefined,
                {
                    globalCatch: (error) => {
                        toast.error(
                            error.response?.data.error ??
                                "No error message provided",
                        );
                    },
                    throwOnError: false,
                },
            );
        },
    },
    actions: {
        setActiveIdentity(id: string | null) {
            this.activeIdentityId = id;
        },
        updateActiveIdentity(data: Partial<Identity>) {
            if (this.activeIdentityId) {
                this.$patch({
                    identities: this.identities.map((id) =>
                        id.id === this.activeIdentityId
                            ? { ...id, ...data }
                            : id,
                    ),
                });
            }
        },
        async createApp(
            origin: URL,
        ): Promise<z.infer<typeof CredentialApplication>> {
            const redirectUri = new URL(
                `/callback?${new URLSearchParams({ domain: origin.host }).toString()}`,
                useRequestURL().origin,
            );

            const client = new Client(origin);

            const output = await client.createApp("Versia-FE", {
                scopes: ["read", "write", "follow", "push"],
                redirect_uris: redirectUri.href,
                // @ts-expect-error Package.json types are missing this field
                website: pkg.homepage ?? undefined,
            });

            this.applications[origin.host] = output.data;
            return output.data;
        },
        async startSignIn(origin: URL) {
            const client = new Client(origin);
            const appData =
                this.applications[origin.host] ??
                (await this.createApp(origin));

            const url = await client.generateAuthUrl(
                appData.client_id,
                appData.client_secret,
                {
                    scopes: ["read", "write", "follow", "push"],
                    redirect_uri: appData.redirect_uris[0],
                },
            );

            window.location.href = url;
        },
        async finishSignIn(code: string, origin: URL): Promise<void> {
            const appData = this.applications[origin.host];

            if (!appData) {
                toast.error(`No application data found for ${origin.host}`);
                return;
            }

            const client = new Client(origin);

            const token = await client.fetchAccessToken(
                appData.client_id,
                appData.client_secret,
                code,
                appData.redirect_uris[0],
            );

            const authClient = new Client(origin, token.data.access_token);

            const [account, instance, emojis] = await Promise.all([
                authClient.verifyAccountCredentials(),
                authClient.getInstance(),
                authClient.getInstanceCustomEmojis(),
            ]);

            if (
                !this.identities.find((i) => i.account.id === account.data.id)
            ) {
                const newIdentity: Identity = {
                    id: crypto.randomUUID(),
                    token: token.data,
                    account: account.data,
                    instance: instance.data,
                    emojis: emojis.data,
                };

                this.identities.push(newIdentity);
                this.activeIdentityId = newIdentity.id;
            } else {
                this.activeIdentityId = this.identities.find(
                    (i) => i.account.id === account.data.id,
                )?.id as string;
            }
        },
        async signOut(identityId?: string) {
            const id = identityId ?? this.activeIdentityId;
            const identity = this.identities.find((i) => i.id === id);

            if (!identity) {
                return;
            }

            const appData = this.applications[identity.instance.domain];

            if (!appData) {
                return;
            }

            await this.client.revokeToken(
                appData.client_id,
                appData.client_secret,
                identity.token.access_token,
            );

            if (this.activeIdentityId === id) {
                this.activeIdentityId = null;
            }
            this.identities = this.identities.filter((i) => i.id !== id);
        },
    },
    persist: {
        storage: localStorage,
    },
});
