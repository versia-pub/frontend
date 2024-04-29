<template>
    <aside
        class="fixed h-dvh z-20 md:flex hidden flex-col p-4 bg-dark-800 gap-10 max-w-20 hover:max-w-72 duration-200 group">
        <NuxtLink class="rounded w-11 h-11 ring-1 ring-white/10 hover:scale-105 duration-200" href="/">
            <img src="https://lysand.org/logo.png" alt="Lysand logo" />
        </NuxtLink>

        <div class="flex flex-col gap-3">
            <h3 class="font-semibold text-gray-300 text-xs uppercase opacity-0 group-hover:opacity-100 duration-200">
                Timelines</h3>
            <NuxtLink v-for="timeline in timelines" :key="timeline.href" :to="timeline.href">
                <ButtonsBase v-if="!timeline.requiresAuth || (timeline.requiresAuth && tokenData)"
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 overflow-hidden h-12 w-full duration-200">
                    <Icon :name="timeline.icon" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">{{ timeline.name }}</span>
                </ButtonsBase>
            </NuxtLink>
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
                <ButtonsBase v-if="tokenData" @click="compose"
                    class="flex flex-row text-left items-center justify-start gap-3 text-lg hover:ring-1 ring-white/10 bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 overflow-hidden h-12 w-full duration-200">
                    <Icon name="tabler:writing" class="shrink-0 text-2xl" />
                    <span class="pr-28 line-clamp-1">Compose</span>
                </ButtonsBase>
            </ClientOnly>
        </div>
    </aside>
</template>

<script lang="ts" setup>
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
]);

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
        .catch(() => {});

    tokenData.value = null;
    me.value = null;
    await navigateTo("/");
};
</script>