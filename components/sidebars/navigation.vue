<template>
    <aside
        class="fixed h-dvh z-10 md:flex hidden flex-col p-4 bg-background-800 gap-10 max-w-[80px] hover:max-w-72 w-full duration-200 group ring-1 ring-background-500"
        aria-label="Navigation" role="complementary">
        <NuxtLink href="/">
            <img crossorigin="anonymous" class="size-11 rounded ring-1 ring-white/10 hover:scale-105 duration-200"
                :src="instance?.thumbnail.url ?? '/logo.webp'" alt="Logo of your instance" />
        </NuxtLink>

        <div class="flex flex-col gap-3">
            <h3 class="font-semibold text-text-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Timelines</h3>

            <NuxtLink v-for="timeline in visibleTimelines" :key="timeline.href" :to="timeline.href">
                <ButtonBase theme="outline" class="w-full !justify-start overflow-hidden rounded-sm">
                    <Icon :icon="timeline.icon" class="!size-6" />
                    <span class="shrink-0 line-clamp-1">{{ timeline.name }}</span>
                </ButtonBase>
            </NuxtLink>

        </div>

        <div class="flex flex-col gap-3 mt-auto">
            <h3 class="font-semibold text-text-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Account</h3>

            <AccountPicker @sign-in="signIn().finally(() => loadingAuth = false)"
                @sign-out="id => signOut(id).finally(() => loadingAuth = false)" />
            <NuxtLink href="/register" v-if="!identity">
                <ButtonBase theme="outline" class="w-full !justify-start overflow-hidden rounded-sm">
                    <Icon icon="tabler:certificate" class="!size-6" />
                    <span class="shrink-0 line-clamp-1">Register</span>
                </ButtonBase>
            </NuxtLink>
            <NuxtLink href="/settings" v-if="identity">
                <ButtonBase @click="$emit('signIn')" theme="secondary" class="w-full !justify-start overflow-hidden">
                    <Icon icon="tabler:adjustments" class="!size-6" />
                    <span class="shrink-0 line-clamp-1">Settings</span>
                </ButtonBase>
            </NuxtLink>
            <h3 v-if="identity"
                class="font-semibold text-text-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Posts</h3>
            <ButtonBase v-if="identity" @click="compose" title="Open composer (shortcut: n)" theme="gradient"
                class="!justify-start overflow-hidden">
                <Icon icon="tabler:writing" class="!size-6" />
                <span class="shrink-0 line-clamp-1">Compose</span>
                <kbd class="text-xs font-semibold rounded bg-background-500 font-mono px-1 flex flex-row ml-auto">
                    <iconify-icon icon="tabler:keyboard" height="1rem" width="1rem" class="inline" aria-hidden="true" />
                    <iconify-icon icon="tabler:letter-n-small" height="1rem" width="1rem" class="inline -mr-1"
                        aria-hidden="true" />
                </kbd>
            </ButtonBase>
            <ButtonBase v-if="$pwa?.needRefresh" @click="$pwa?.updateServiceWorker()" title="Update service worker"
                theme="primary" class="w-full !justify-start overflow-hidden">
                <Icon icon="tabler:refresh" class="!size-6" />
                <span class="shrink-0 line-clamp-1">Update</span>
            </ButtonBase>

        </div>
    </aside>
    <!-- Mobile bottom navbar -->
    <nav
        :class="['fixed bottom-0 left-0 right-0 z-20 h-16 md:hidden grid gap-3 p-2 *:shadow-xl bg-background-900 ring-1 ring-white/10 text-text-200', !!identity ? 'grid-cols-4' : 'grid-cols-3']">

        <AdaptiveDropdown>
            <template #button>
                <ButtonMobileNavbar icon="tabler:home" text="Timelines" />
            </template>

            <template #items>
                <Menu.Item value="" v-for="timeline in visibleTimelines" :key="timeline.href">
                    <NuxtLink :href="timeline.href">
                        <ButtonDropdown :icon="timeline.icon" class="w-full">
                            {{ timeline.name }}
                        </ButtonDropdown>
                    </NuxtLink>
                </Menu.Item>
            </template>
        </AdaptiveDropdown>
        <NuxtLink href="/notifications" class="w-full">
            <ButtonMobileNavbar icon="tabler:bell" text="Notifications" />
        </NuxtLink>
        <ButtonMobileNavbar v-if="$pwa?.needRefresh" @click="$pwa?.updateServiceWorker(true)" icon="tabler:refresh"
            text="Update" />
        <AccountPicker v-else @sign-in="signIn().finally(() => loadingAuth = false)"
            @sign-out="id => signOut(id).finally(() => loadingAuth = false)">
            <ButtonMobileNavbar icon="tabler:user" text="Account" />
        </AccountPicker>
        <button @click="compose" v-if="identity"
            class="flex flex-col items-center justify-center p-2 rounded bg-gradient-to-tr from-[theme(colors.primary.300/70%)] via-purple-300/70 to-indigo-400/70">
            <iconify-icon icon="tabler:writing" class="text-2xl" />
            <span class="text-xs hidden md:inline">Compose</span>
        </button>
    </nav>
</template>

<script lang="ts" setup>
import { Menu } from "@ark-ui/vue";
import ButtonBase from "~/packages/ui/components/buttons/button.vue";
import Icon from "~/packages/ui/components/icons/icon.vue";
import ButtonDropdown from "../buttons/button-dropdown.vue";
import ButtonMobileNavbar from "../buttons/button-mobile-navbar.vue";
import Button from "../composer/button.vue";
import AdaptiveDropdown from "../dropdowns/AdaptiveDropdown.vue";
import AccountPicker from "./account-picker.vue";
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