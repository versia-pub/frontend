<template>
    <div class="flex h-svh items-center justify-center px-4 py-6 lg:px-8 bg-center bg-no-repeat bg-cover" :style="{
        backgroundImage: 'url(/images/banner.webp)',
    }">
        <form method="POST" :action="url.pathname.replace('/oauth/consent', '/oauth/authorize')" class="w-full max-w-md">
            <Card class="*:w-full p-6">
                <input type="hidden" v-for="[key, value] in url.searchParams" :key="key" :name="key" :value="value" />
                <CardHeader>
                    <CardTitle as="h1" class="text-2xl break-words">{{
                        m.fresh_broad_cockroach_radiate({
                            application: application ?? "",
                        })
                        }}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Card class="p-2 gap-1">
                        <CardContent class="flex flex-col px-4 py-2 w-full">
                            <CardTitle as="h2" class="text-lg">{{
                                application
                                }}</CardTitle>
                            <a v-if="website" :href="website" target="_blank" rel="noopener noreferrer"
                                class="underline">{{ website }}</a>
                        </CardContent>
                    </Card>
                    <ul class="list-none my-6 [&>li]:mt-2">
                        <li v-for="text in getScopeText(scopes)" :key="text[1]"
                            class="flex flex-row gap-1 items-center">
                            <Check class="size-4" />
                            <h2 class="text-sm">
                                <strong class="font-bold">{{ text[0] }}</strong>
                                {{ text[1] }}
                            </h2>
                        </li>
                    </ul>
                    <div class="flex-col flex gap-y-1 text-sm">
                        <p v-html="m.gross_antsy_kangaroo_succeed({
                            application: application ?? '',
                        })
                            "></p>
                        <p v-html="m.hour_close_giraffe_mop({
                            application: application ?? '',
                        })
                            "></p>
                    </div>
                </CardContent>
                <CardFooter class="grid gap-2">
                    <Button variant="default" type="submit">{{
                        m.last_spare_polecat_reside()
                        }}</Button>
                    <Button :as="NuxtLink" href="/" variant="secondary">{{
                        m.soft_bold_ant_attend()
                        }}</Button>
                </CardFooter>
            </Card>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import * as m from "~/paraglide/messages.js";
import { NuxtLink } from "#components";

useHead({
    title: m.lower_factual_frog_evoke(),
});

const url = useRequestURL();
const params = useUrlSearchParams();

const application = params.application;
const website = params.website
    ? decodeURIComponent(params.website as string)
    : null;
const redirectUri = params.redirect_uri as string;
const clientId = params.client_id;
const scope = params.scope ? decodeURIComponent(params.scope as string) : "";

const validUrlParameters = application && redirectUri && clientId && scope;

const oauthScopeText: Record<string, string> = {
    "rw:accounts": m.awake_ago_capybara_kick(),
    "rw:blocks": m.teary_zesty_racoon_transform(),
    "rw:bookmarks": m.whole_flaky_nuthatch_rush(),
    "rw:favourites": m.still_spicy_lionfish_quell(),
    "rw:filters": m.away_mean_dolphin_empower(),
    "rw:follows": m.sleek_empty_penguin_radiate(),
    "rw:lists": m.every_silly_racoon_lift(),
    "rw:mutes": m.top_careful_scallop_clip(),
    "rw:notifications": m.this_short_bulldog_walk(),
    "r:search": m.fresh_odd_rook_forgive(),
    "rw:statuses": m.witty_whole_capybara_pull(),
    "w:conversations": m.agent_warm_javelina_blink(),
    "w:media": m.dirty_red_jellyfish_ascend(),
    "w:reports": m.crisp_vivid_seahorse_tend(),
};

const scopes = scope.split(" ");

// If only read scope, then we can just say "read your account information"
// If only write, then we can just say "write to your account information"
// If both, then we can say "read and write to your account information"
// Return an array of strings to display
// "read write:accounts" returns all the fields with $VERB as read, plus the accounts field with $VERB as write
const getScopeText = (fullScopes: string[]) => {
    const scopeTexts: string[][] = [];

    const readScopes = fullScopes.filter((scope) => scope.includes("read"));
    const writeScopes = fullScopes.filter((scope) => scope.includes("write"));

    for (const possibleScope of Object.keys(oauthScopeText)) {
        const [scopeAction, scopeName] = possibleScope.split(":");

        if (
            scopeAction?.includes("rw") &&
            (readScopes.includes(`read:${scopeName}`) ||
                readScopes.find((scope) => scope === "read")) &&
            (writeScopes.includes(`write:${scopeName}`) ||
                writeScopes.find((scope) => scope === "write"))
        ) {
            if (oauthScopeText[possibleScope]?.includes("$VERB")) {
                scopeTexts.push([
                    m.teary_such_jay_fade(),
                    oauthScopeText[possibleScope]?.replace("$VERB", "") ?? "",
                ]);
            } else {
                scopeTexts.push(["", oauthScopeText[possibleScope] ?? ""]);
            }
            continue;
        }

        if (
            scopeAction?.includes("r") &&
            (readScopes.includes(`read:${scopeName}`) ||
                readScopes.find((scope) => scope === "read"))
        ) {
            if (oauthScopeText[possibleScope]?.includes("$VERB")) {
                scopeTexts.push([
                    m.smug_safe_warthog_dare(),
                    oauthScopeText[possibleScope]?.replace("$VERB", "") ?? "",
                ]);
            } else {
                scopeTexts.push(["", oauthScopeText[possibleScope] ?? ""]);
            }
        }

        if (
            scopeAction?.includes("w") &&
            (writeScopes.includes(`write:${scopeName}`) ||
                writeScopes.find((scope) => scope === "write"))
        ) {
            if (oauthScopeText[possibleScope]?.includes("$VERB")) {
                scopeTexts.push([
                    m.loose_large_blackbird_peek(),
                    oauthScopeText[possibleScope]?.replace("$VERB", "") ?? "",
                ]);
            } else {
                scopeTexts.push(["", oauthScopeText[possibleScope] ?? ""]);
            }
        }
    }
    return scopeTexts;
};
</script>
