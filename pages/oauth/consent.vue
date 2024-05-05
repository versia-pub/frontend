<template>
    <ClientOnly>
        <div class="flex min-h-screen relative flex-col justify-center px-6 py-12 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
            </div>
            <div v-if="validUrlParameters" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" method="POST"
                    :action="url.pathname.replace('/oauth/consent', '/oauth/authorize')">
                    <input type="hidden" v-for="([key, value]) in url.searchParams" :key="key" :name="key"
                        :value="value" />
                    <div class="flex flex-col items-center gap-y-5">
                        <h1 class="font-bold text-2xl text-gray-50 text-center tracking-tight">Allow this application to
                            access your
                            account?</h1>
                        <div v-if="application" class="rounded-sm ring-2 ring-white/10 px-4 py-2 w-full">
                            <h2 class="font-bold text-gray-200">{{ application }}</h2>
                            <a v-if="website" :href="website" target="_blank" class="underline text-pink-700">{{ website
                                }}</a>
                        </div>
                    </div>

                    <h2 class="text-gray-50 tracking-tight text-xl font-semibold">
                        This application will be able to:
                    </h2>

                    <ul class="flex flex-col gap-y-1.5">
                        <li v-for="text in getScopeText(scopes)" :key="text[1]" class="flex flex-row gap-1">
                            <svg class="fill-pink-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                            </svg>
                            <h2 class="text-sm text-gray-200">
                                <strong class="font-bold">{{ text[0] }}</strong> {{ text[1] }}
                            </h2>
                        </li>
                    </ul>

                    <div class="flex-col flex gap-y-1">
                        <p class="text-sm text-gray-200">You are signing in to <b>{{ application }}</b> with your
                            account.</p>
                        <p class="text-sm text-gray-200">This allows <b>{{ application }}</b> to perform the above
                            account
                            actions.</p>
                    </div>

                    <div class="flex flex-col gap-3">
                        <ButtonsPrimary type="submit">Authorize</ButtonsPrimary>
                        <NuxtLink href="/" class="w-full">
                            <ButtonsSecondary class="w-full">Cancel</ButtonsSecondary>
                        </NuxtLink>
                    </div>
                </form>
            </div>
            <div v-else class="mx-auto max-w-md mt-10">
                <h1 class="text-2xl font-bold tracking-tight text-gray-50 sm:text-4xl">Invalid access
                    parameters
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-300">This page should be accessed
                    through a valid OAuth2 authorization request. Please use a <strong class="font-bold">Mastodon
                        API</strong> client to access this page.
                </p>
                <p class="mt-6 text-lg leading-8 text-gray-300">Here are some recommended clients:</p>
                <ul class="w-full flex flex-col gap-3 mt-4">
                    <li v-for="client of useConfig().RECOMMENDED_CLIENTS" :key="client.name" class="w-full">
                        <a :href="client.link" target="_blank"
                            class="rounded-sm ring-2 ring-white/10 px-4 py-2 w-full flex flex-row gap-3 items-center">
                            <img crossorigin="anonymous" :src="client.icon" :alt="`${client.name}'s logo'`" class="h-10 w-10" />
                            <div class="flex flex-col justify-between items-start">
                                <h2 class="font-bold text-gray-100">{{ client.name }}</h2>
                                <span class="underline text-pink-700">{{ client.link }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
                <p class="mt-6 text-lg leading-8 text-gray-300">
                    Many other clients exist, but <strong class="font-bold">they have not been tested for
                        compatibility</strong>. Bug reports are nevertheless welcome.
                </p>

                <p class="mt-6 text-lg leading-8 text-gray-300">
                    Found a problem? Report it on <a href="https://github.com/lysand-org/lysand/issues/new/choose"
                        target="_blank" class="underline text-pink-700">the issue tracker</a>.
                </p>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const url = useRequestURL();
const query = useRoute().query;

const application = query.application;
const website = query.website
    ? decodeURIComponent(query.website as string)
    : null;
const redirect_uri = query.redirect_uri as string;
const client_id = query.client_id;
const scope = query.scope ? decodeURIComponent(query.scope as string) : "";

const validUrlParameters =
    application && website && redirect_uri && client_id && scope;

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
    const scopeTexts = [];

    const readScopes = fullScopes.filter((scope) => scope.includes("read"));
    const writeScopes = fullScopes.filter((scope) => scope.includes("write"));

    for (const possibleScope of Object.keys(oauthScopeText)) {
        const [scopeAction, scopeName] = possibleScope.split(":");

        if (
            scopeAction.includes("rw") &&
            (readScopes.includes(`read:${scopeName}`) ||
                readScopes.find((scope) => scope === "read")) &&
            (writeScopes.includes(`write:${scopeName}`) ||
                writeScopes.find((scope) => scope === "write"))
        ) {
            if (oauthScopeText[possibleScope].includes("$VERB"))
                scopeTexts.push([
                    "Read and write",
                    oauthScopeText[possibleScope].replace("$VERB", ""),
                ]);
            else scopeTexts.push(["", oauthScopeText[possibleScope]]);
            continue;
        }

        if (
            scopeAction.includes("r") &&
            (readScopes.includes(`read:${scopeName}`) ||
                readScopes.find((scope) => scope === "read"))
        ) {
            if (oauthScopeText[possibleScope].includes("$VERB"))
                scopeTexts.push([
                    "Read",
                    oauthScopeText[possibleScope].replace("$VERB", ""),
                ]);
            else scopeTexts.push(["", oauthScopeText[possibleScope]]);
        }

        if (
            scopeAction.includes("w") &&
            (writeScopes.includes(`write:${scopeName}`) ||
                writeScopes.find((scope) => scope === "write"))
        ) {
            if (oauthScopeText[possibleScope].includes("$VERB"))
                scopeTexts.push([
                    "Write",
                    oauthScopeText[possibleScope].replace("$VERB", ""),
                ]);
            else scopeTexts.push(["", oauthScopeText[possibleScope]]);
        }
    }
    return scopeTexts;
};
</script>
