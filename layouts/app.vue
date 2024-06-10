<template>
    <div class="from-dark-600 to-dark-900 bg-gradient-to-tl relative min-h-dvh">
        <svg class="absolute inset-0 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true">
            <defs>
                <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1"
                    patternUnits="userSpaceOnUse">
                    <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
            </defs><svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
                <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    stroke-width="0"></path>
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"></rect>
        </svg>
        <LazySidebarsNavigation />
        <div class="relative md:pl-20 min-h-dvh flex flex-row overflow-hidden justify-center xl:justify-between">
            <OverlayScrollbarsComponent :defer="true" class="w-full max-h-dvh overflow-y-auto">
                <slot />
            </OverlayScrollbarsComponent>
            <ClientOnly>
                <LazySidebarsCollapsibleAside v-if="width > 1280 && identity" direction="right"
                    class="max-w-md max-h-dvh overflow-y-auto w-full hidden absolute inset-y-0 xl:flex">
                    <LazyTimelinesTimelineScroller>
                        <LazyTimelinesNotifications />
                    </LazyTimelinesTimelineScroller>
                    <!-- <div class="mt-auto prose prose-invert prose-sm flex flex-col gap-4 px-10 pb-10" v-if="!tokenData">
                        <div class="text-center">
                            <strong
                                class="bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text">Lysand
                                {{ instance?.lysand_version ?? instance?.version }}</strong> • <a
                                href="https://github.com/lysand-org/lysand" target="_blank">Source Code</a>• <a
                                href="https://github.com/lysand-org/lysand/issues" target="_blank">Report an Issue</a>
                        </div>


                        <NuxtLink href="https://github.com/lysand-org/lysand" target="_blank">
                            <ButtonsSecondary class="w-full">
                                Create your own instance
                            </ButtonsSecondary>
                        </NuxtLink>

                        <NuxtLink href="/about/apps">
                            <ButtonsSecondary class="w-full">
                                Mobile Apps
                            </ButtonsSecondary>
                        </NuxtLink>
                    </div> -->
                </LazySidebarsCollapsibleAside>
            </ClientOnly>
        </div>
    </div>
    <LazyComposerModal />
    <LazySocialElementsNotesAttachmentDialog />
</template>

<script setup lang="ts">
import { OverlayScrollbarsComponent } from "#imports";
const { width } = useWindowSize();

const { n, o_i_d_c } = useMagicKeys();
const identity = useCurrentIdentity();
const client = useClient();
const providers = useSSOConfig();

watchEffect(async () => {
    if (n.value) {
        // Wait 50ms
        await new Promise((resolve) => setTimeout(resolve, 50));
        useEvent("composer:open");
    }
    if (o_i_d_c.value) {
        useEvent("notification:new", {
            type: "progress",
            title: "Linking your account",
            persistent: true,
        });

        const issuer = providers.value?.providers[0];

        if (!issuer) {
            console.error("No SSO provider found");
            return;
        }

        const response = await fetch(new URL("/api/v1/sso", client.value.url), {
            method: "POST",
            headers: {
                Authorization: `Bearer ${identity.value?.tokens.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                issuer: issuer.id,
            }),
        });

        const json = await response.json();
        window.location.href = json.link;
    }
});
</script>