<template>
    <div class="from-dark-600 to-dark-900 bg-gradient-to-tl min-h-dvh">
        <SidebarsNavigation />
        <div class="relative md:pl-20 min-h-dvh flex flex-row overflow-hidden justify-center xl:justify-between">
            <OverlayScrollbarsComponent :defer="true" class="w-full max-h-dvh overflow-y-auto">
                <slot />
            </OverlayScrollbarsComponent>
            <ClientOnly>
                <CollapsibleAside v-if="width > 1280 && tokenData" direction="right"
                    class="max-w-md max-h-dvh overflow-y-auto w-full hidden absolute inset-y-0 xl:flex">
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
import { OverlayScrollbarsComponent } from "#imports";

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

watchEffect(async () => {
    if (n.value) {
        // Wait 50ms
        await new Promise((resolve) => setTimeout(resolve, 50));
        useEvent("composer:open");
    }
});
</script>