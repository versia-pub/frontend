<template>
    <div class="flex h-svh items-center justify-center px-6 py-12 lg:px-8 bg-center bg-no-repeat bg-cover" :style="{
        backgroundImage: 'url(/images/banner.webp)'
    }">
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle as="h1" class="text-2xl break-words">Authorize &ldquo;{{ application }}&rdquo;?</CardTitle>
            </CardHeader>
            <CardContent>
                <Card>
                    <CardContent class="flex flex-col px-4 py-2">
                        <CardTitle as="h2" class="text-lg">{{ application }}</CardTitle>
                        <a v-if="website" :href="website" target="_blank" rel="noopener noreferrer" class="underline">{{ website }}</a>
                    </CardContent>
                </Card>
                <ul class="list-none my-6 [&>li]:mt-2">
                    <li v-for="text in getScopeText(scopes)" :key="text[1]" class="flex flex-row gap-1 items-center">
                        <Check class="size-4" />
                        <h2 class="text-sm">
                            <strong class="font-bold">{{ text[0] }}</strong> {{ text[1] }}
                        </h2>
                    </li>
                </ul>
                <div class="flex-col flex gap-y-1 text-sm">
                    <p>You are signing in to <b>{{ application }}</b> with your
                        account.</p>
                    <p>This allows <b>{{ application }}</b> to perform the above
                        account
                        actions.</p>
                </div>
            </CardContent>
            <CardFooter class="grid gap-2">
                <Button variant="default" type="submit">Authorize</Button>
                <Button :as="NuxtLink" href="/" variant="secondary">Cancel</Button>
            </CardFooter>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { NuxtLink } from "#components";

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
    "rw:accounts": "$VERB your account information",
    "rw:blocks": "$VERB your block list",
    "rw:bookmarks": "$VERB your bookmarks",
    "rw:favourites": "$VERB your favourites",
    "rw:filters": "$VERB your filters",
    "rw:follows": "$VERB your follows",
    "rw:lists": "$VERB your lists",
    "rw:mutes": "$VERB your mutes",
    "rw:notifications": "$VERB your notifications",
    "r:search": "Perform searches",
    "rw:statuses": "$VERB your statuses",
    "w:conversations": "Edit your conversations",
    "w:media": "Upload media",
    "w:reports": "Report users",
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
                    "Read and write",
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
                    "Read",
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
                    "Write",
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
