<template>
    <div class="from-dark-600 to-dark-900 bg-gradient-to-tl min-h-dvh">
        <SidebarsNavigation />
        <div class="relative md:pl-20 min-h-dvh flex flex-row justify-center xl:justify-between">
            <ClientOnly>
                <CollapsibleAside v-if="width > 1280" class="max-w-md max-h-dvh overflow-y-auto w-full xl:flex hidden">
                    <SocialElementsInstancePresentation />
                </CollapsibleAside>
            </ClientOnly>
            <div class="w-full max-h-dvh max-w-2xl">
                <slot />
            </div>
            <ClientOnly>
                <CollapsibleAside v-if="width > 1280 && tokenData" direction="right"
                    class="max-w-md max-h-dvh overflow-y-auto w-full hidden xl:flex">
                    <TimelinesTimelineScroller>
                        <TimelinesNotifications />
                    </TimelinesTimelineScroller>
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
                </CollapsibleAside>
                <div v-else-if="width > 1280" class="max-w-md w-full max-h-dvh hidden xl:flex">
                    <!-- Padding only container -->
                </div>
            </ClientOnly>
        </div>
    </div>
    <ComposerModal />
</template>

<script setup lang="ts">
import { convert } from "html-to-text";
import CollapsibleAside from "~/components/sidebars/collapsible-aside.vue";

const tokenData = useTokenData();
const client = useMegalodon(tokenData);
const instance = useInstance(client);
const description = useExtendedDescription(client);
const { width } = useWindowSize();

useServerSeoMeta({
    title: instance.value?.title,
    ogImage: instance.value?.banner,
    description: convert(description.value?.content ?? ""),
    ogSiteName: "Lysand",
    colorScheme: "dark",
});

const { n } = useMagicKeys();

watchEffect(() => {
    if (n.value) {
        useEvent("composer:open");
    }
});
</script>