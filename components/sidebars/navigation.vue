<template>
    <aside
        class="fixed h-dvh z-10 md:flex hidden flex-col p-4 bg-dark-800 gap-10 max-w-20 hover:max-w-72 duration-200 group ring-1 ring-dark-500"
        aria-label="Navigation" role="complementary">
        <NuxtLink href="/">
            <img crossorigin="anonymous" class="size-11 rounded ring-1 ring-white/10 hover:scale-105 duration-200"
                :src="instance?.thumbnail.url ?? '/logo.webp'" alt="Logo of your instance" />
        </NuxtLink>

        <div class="flex flex-col gap-3">
            <h3 class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Timelines</h3>

            <NuxtLink v-for="timeline in visibleTimelines" :key="timeline.href" :to="timeline.href">
                <ButtonsBase
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                    <iconify-icon :icon="timeline.icon" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">{{ timeline.name }}</span>
                </ButtonsBase>
            </NuxtLink>

        </div>

        <div class="flex flex-col gap-3 mt-auto">
            <h3 class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Account</h3>

            <SidebarsAccountPicker @sign-in="signIn().finally(() => loadingAuth = false)"
                @sign-out="id => signOut(id).finally(() => loadingAuth = false)" />
            <NuxtLink href="/register" v-if="!identity">
                <ButtonsBase
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                    <iconify-icon icon="tabler:certificate" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Register</span>
                </ButtonsBase>
            </NuxtLink>
            <NuxtLink href="/settings" v-if="identity">
                <button @click="$emit('signIn')" class="w-full overflow-hidden">
                    <div class="rounded text-left flex flex-row items-center gap-x-2 hover:scale-[95%]">
                        <div
                            class="shrink-0 size-12 border-dashed border-white/20 border flex items-center justify-center rounded">
                            <iconify-icon icon="tabler:adjustments" class="size-6 text-gray-200" width="none" />
                        </div>
                        <span
                            class="line-clamp-1 font-semibold p-1 justify-around text-sm text-gray-300 grow overflow-hidden">
                            Settings
                        </span>
                    </div>
                </button>
            </NuxtLink>
            <h3 v-if="identity"
                class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Posts</h3>
            <ButtonsBase v-if="identity" @click="compose" title="Open composer (shortcut: n)"
                class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 bg-gradient-to-tr from-primary-300 via-purple-300 to-indigo-400 overflow-hidden h-12 w-full duration-200">
                <iconify-icon icon="tabler:writing" class="shrink-0 text-2xl" />
                <span class="pr-28 line-clamp-1">Compose</span>
                <kbd class="text-xs font-semibold rounded bg-dark-500 font-mono px-1 flex flex-row">
                    <iconify-icon icon="tabler:keyboard" height="1rem" width="1rem" class="inline" aria-hidden="true" />
                    <iconify-icon icon="tabler:letter-n-small" height="1rem" width="1rem" class="inline -mr-1"
                        aria-hidden="true" />
                </kbd>
            </ButtonsBase>
            <ButtonsBase v-if="$pwa?.needRefresh" @click="$pwa?.updateServiceWorker()" title="Update service worker"
                class="flex flex-row text-left items-center justify-start gap-3 text-lg ring-2   ring-primary-600 overflow-hidden h-12 w-full duration-200">
                <iconify-icon icon="tabler:refresh" class="shrink-0 text-2xl" />
                <span class="pr-28 line-clamp-1">Update</span>
            </ButtonsBase>

        </div>
    </aside>
    <!-- Mobile bottom navbar -->
    <nav
        :class="['fixed bottom-0 left-0 right-0 z-20 h-16 md:hidden grid gap-3 p-2 *:shadow-xl bg-dark-900 ring-1 ring-white/10 text-gray-200', !!identity ? 'grid-cols-4' : 'grid-cols-3']">

        <DropdownsAdaptiveDropdown>
            <template #button>
                <ButtonsMobileNavbarButton icon="tabler:home" text="Timelines" />
            </template>

            <template #items>
                <Menu.Item value="" v-for="timeline in visibleTimelines" :key="timeline.href">
                    <NuxtLink :href="timeline.href">
                        <ButtonsDropdownElement :icon="timeline.icon" class="w-full">
                            {{ timeline.name }}
                        </ButtonsDropdownElement>
                    </NuxtLink>
                </Menu.Item>
            </template>
        </DropdownsAdaptiveDropdown>
        <NuxtLink href="/notifications" class="w-full">
            <ButtonsMobileNavbarButton icon="tabler:bell" text="Notifications" />
        </NuxtLink>
        <ButtonsMobileNavbarButton v-if="$pwa?.needRefresh" @click="$pwa?.updateServiceWorker(true)"
            icon="tabler:refresh" text="Update" />
        <SidebarsAccountPicker v-else @sign-in="signIn().finally(() => loadingAuth = false)"
            @sign-out="id => signOut(id).finally(() => loadingAuth = false)">
            <ButtonsMobileNavbarButton icon="tabler:user" text="Account" />
        </SidebarsAccountPicker>
        <button @click="compose" v-if="identity"
            class="flex flex-col items-center justify-center p-2 rounded bg-gradient-to-tr from-[theme(colors.primary.300/70%)] via-purple-300/70 to-indigo-400/70">
            <iconify-icon icon="tabler:writing" class="text-2xl" />
            <span class="text-xs hidden md:inline">Compose</span>
        </button>
    </nav>
</template>

<script lang="ts" setup>
import { Menu } from "@ark-ui/vue";
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
        (timeline) => !timeline.requiresAuth || identity.value,
    ),
);

const loadingAuth = ref(false);

const appData = useAppData();
const identity = useCurrentIdentity();
const identities = useIdentities();
const client = useClient();
const instance = useInstance();

const compose = () => {
    useEvent("composer:open");
};

const signIn = async () => {
    loadingAuth.value = true;

    const output = await client.value.createApp("Lysand", {
        scopes: ["read", "write", "follow", "push"],
        redirect_uris: new URL("/", useRequestURL().origin).toString(),
        website: useBaseUrl().value,
    });

    if (!output?.data) {
        alert("Failed to create app");
        return;
    }

    appData.value = output.data;

    const url = await client.value.generateAuthUrl(
        output.data.client_id,
        output.data.client_secret,
        {
            scopes: ["read", "write", "follow", "push"],
            redirect_uri: new URL("/", useRequestURL().origin).toString(),
        },
    );

    if (!url) {
        alert("Failed to generate auth URL");
        return;
    }

    window.location.href = url;
};

const signOut = async (id?: string) => {
    loadingAuth.value = true;

    if (!(appData.value && identity.value)) {
        console.error("No app or identity data to sign out");
        return;
    }

    const identityToRevoke = id
        ? identities.value.find((i) => i.id === id)
        : identity.value;

    if (!identityToRevoke) {
        console.error("No identity to revoke");
        return;
    }

    // Don't do anything on error, as Lysand doesn't implement the revoke endpoint yet
    await client.value
        ?.revokeToken(
            appData.value.client_id,
            identityToRevoke.tokens.access_token,
            identityToRevoke.tokens.access_token,
        )
        .catch(() => {
            // Do nothing
        });

    if (id === identity.value.id) {
        identity.value = null;
        await navigateTo("/");
        return;
    }

    identities.value = identities.value.filter((i) => i.id !== id);
    await useEvent("notification:new", {
        type: "success",
        title: "Signed out",
        description: "Account signed out successfully",
    });
};
</script>