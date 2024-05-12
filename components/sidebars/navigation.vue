<template>
    <aside
        class="fixed h-dvh z-20 md:flex hidden flex-col p-4 bg-dark-800 gap-10 max-w-20 hover:max-w-72 duration-200 group">
        <NuxtLink href="/">
            <img crossorigin="anonymous" class="size-11 rounded ring-1 ring-white/10 hover:scale-105 duration-200"
                src="https://cdn.lysand.org/logo.webp" alt="Lysand logo" />
        </NuxtLink>

        <div class="flex flex-col gap-3">
            <h3 class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Timelines</h3>
            <ClientOnly>
                <NuxtLink v-for="timeline in visibleTimelines" :key="timeline.href" :to="timeline.href">
                    <ButtonsBase
                        class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                        <Icon :name="timeline.icon" class="shrink-0 text-2xl" />
                        <span class="pr-28 line-clamp-1">{{ timeline.name }}</span>
                    </ButtonsBase>
                </NuxtLink>
            </ClientOnly>
        </div>

        <div class="flex flex-col gap-3 mt-auto">
            <h3 class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Account</h3>
            <ClientOnly>
                <ButtonsBase v-if="tokenData" @click="signOut().finally(() => loadingAuth = false)"
                    :loading="loadingAuth"
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                    <Icon name="tabler:logout" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Sign Out</span>
                </ButtonsBase>
                <ButtonsBase v-else @click="signIn().finally(() => loadingAuth = false)" :loading="loadingAuth"
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                    <Icon name="tabler:login" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Sign In</span>
                </ButtonsBase>
                <NuxtLink href="/register" v-if="!tokenData">
                    <ButtonsBase
                        class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                        <Icon name="tabler:certificate" class="shrink-0 text-2xl" />
                        <span class="pr-28 line-clamp-1">Register</span>
                    </ButtonsBase>
                </NuxtLink>
                <h3 v-if="tokenData"
                    class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                    Posts</h3>
                <ButtonsBase v-if="tokenData" @click="compose" title="Open composer (shortcut: n)"
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 overflow-hidden h-12 w-full duration-200">
                    <Icon name="tabler:writing" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Compose</span>
                    <kbd class="text-xs font-semibold rounded bg-dark-500 font-mono px-1 flex flex-row">
                        <Icon name="tabler:keyboard" class="size-4 inline" aria-hidden="true" />
                        <Icon name="tabler:letter-n-small" class="size-4 inline -mr-1" aria-hidden="true" />
                    </kbd>
                </ButtonsBase>
                <ButtonsBase v-if="$pwa?.needRefresh" @click="$pwa?.updateServiceWorker()" title="Update service worker"
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg ring-2   ring-pink-600 overflow-hidden h-12 w-full duration-200">
                    <Icon name="tabler:refresh" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Update</span>
                </ButtonsBase>
            </ClientOnly>
        </div>
    </aside>
    <!-- Mobile bottom navbar -->
    <nav
        class="fixed bottom-0 left-0 right-0 z-20 md:hidden flex justify-around p-2 *:shadow-xl bg-dark-900 ring-1 ring-white/10 text-gray-200">
        <ClientOnly>
            <DropdownsAdaptiveDropdown>
                <template #button>
                    <HeadlessMenuButton class="flex flex-col items-center justify-center p-2 rounded">
                        <Icon name="tabler:home" class="text-2xl" />
                        <span class="text-xs">Timelines</span>
                    </HeadlessMenuButton>
                </template>

                <template #items>
                    <ClientOnly>
                        <HeadlessMenuItem v-for="timeline in visibleTimelines" :key="timeline.href"
                            :href="timeline.href">
                            <NuxtLink>
                                <ButtonsDropdownElement :icon="timeline.icon" class="w-full">
                                    {{ timeline.name }}
                                </ButtonsDropdownElement>
                            </NuxtLink>
                        </HeadlessMenuItem>
                    </ClientOnly>
                </template>
            </DropdownsAdaptiveDropdown>
            <NuxtLink href="/notifications" class="flex flex-col items-center justify-center p-2 rounded">
                <Icon name="tabler:bell" class="text-2xl" />
                <span class="text-xs">Notifications</span>
            </NuxtLink>
            <ClientOnly v-if="$pwa?.needRefresh">
                <button class="flex flex-col items-center justify-center p-2 rounded ring-2 ring-pink-600"
                    @click="$pwa?.updateServiceWorker(true)">
                    <Icon name="tabler:refresh" class="text-2xl" />
                    <span class="text-xs">Update</span>
                </button>
            </ClientOnly>
            <DropdownsAdaptiveDropdown v-else>
                <template #button>
                    <HeadlessMenuButton class="flex flex-col items-center justify-center p-2 rounded">
                        <Icon name="tabler:user" class="text-2xl" />
                        <span class="text-xs">Account</span>
                    </HeadlessMenuButton>
                </template>

                <template #items>
                    <ClientOnly>
                        <HeadlessMenuItem v-if="tokenData">
                            <ButtonsDropdownElement icon="tabler:logout" class="w-full"
                                @click="signOut().finally(() => loadingAuth = false)" :loading="loadingAuth">
                                Sign Out
                            </ButtonsDropdownElement>
                        </HeadlessMenuItem>
                        <HeadlessMenuItem v-if="!tokenData">
                            <ButtonsDropdownElement icon="tabler:login" class="w-full"
                                @click="signIn().finally(() => loadingAuth = false)" :loading="loadingAuth">
                                Sign In
                            </ButtonsDropdownElement>
                        </HeadlessMenuItem>
                        <HeadlessMenuItem v-if="!tokenData">
                            <NuxtLink href="/register">
                                <ButtonsDropdownElement icon="tabler:certificate" class="w-full">
                                    Register
                                </ButtonsDropdownElement>
                            </NuxtLink>
                        </HeadlessMenuItem>
                    </ClientOnly>
                </template>
            </DropdownsAdaptiveDropdown>
            <button @click="compose" v-if="tokenData"
                class="flex flex-col items-center justify-center p-2 rounded bg-gradient-to-tr from-pink-300/70 via-purple-300/70 to-indigo-400/70">
                <Icon name="tabler:writing" class="text-2xl" />
                <span class="text-xs">Compose</span>
            </button>
        </ClientOnly>
    </nav>
</template>

<script lang="ts" setup>
const { $pwa } = useNuxtApp();
const timelines = ref([
    {
        href: "/home",
        name: "Home",
        icon: "tabler:home",
        requiresAuth: true,
    },
    {
        href: "/public",
        name: "Public",
        icon: "tabler:world",
    },
    {
        href: "/local",
        name: "Local",
        icon: "tabler:home",
    },
    {
        href: "/notifications",
        name: "Notifications",
        icon: "tabler:bell",
        requiresAuth: true,
    },
]);

const visibleTimelines = computed(() =>
    timelines.value.filter(
        (timeline) => !timeline.requiresAuth || tokenData.value,
    ),
);

const loadingAuth = ref(false);

const appData = useAppData();
const tokenData = useTokenData();
const client = useMegalodon();
const me = useMe();

const compose = () => {
    useEvent("composer:open");
};

const signIn = async () => {
    loadingAuth.value = true;

    const output = await client.value?.createApp("Lysand", {
        scopes: ["read", "write", "follow", "push"],
        redirect_uris: new URL("/", useRequestURL().origin).toString(),
        website: useBaseUrl().value,
    });

    if (!output) {
        alert("Failed to create app");
        return;
    }

    appData.value = output;

    const url = await client.value?.generateAuthUrl(
        output.client_id,
        output.client_secret,
        {
            scope: ["read", "write", "follow", "push"],
            redirect_uri: new URL("/", useRequestURL().origin).toString(),
        },
    );

    if (!url) {
        alert("Failed to generate auth URL");
        return;
    }

    window.location.href = url;
};

const signOut = async () => {
    loadingAuth.value = true;

    if (!appData.value || !tokenData.value) {
        console.error("No app or token data to sign out");
        return;
    }

    // Don't do anything on error, as Lysand doesn't implement the revoke endpoint yet
    await client.value
        ?.revokeToken(
            appData.value.client_id,
            tokenData.value.access_token,
            tokenData.value.access_token,
        )
        .catch(() => { });

    tokenData.value = null;
    me.value = null;
    await navigateTo("/");
};
</script>