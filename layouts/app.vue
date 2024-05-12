<template>
    <div class="from-dark-600 to-dark-900 bg-gradient-to-tl min-h-dvh">
        <LazySidebarsNavigation />
        <div class="relative md:pl-20 min-h-dvh flex flex-row overflow-hidden justify-center xl:justify-between">
            <OverlayScrollbarsComponent :defer="true" class="w-full max-h-dvh overflow-y-auto">
                <slot />
            </OverlayScrollbarsComponent>
            <ClientOnly>
                <LazySidebarsCollapsibleAside v-if="width > 1280 && tokenData" direction="right"
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
</template>

<script setup lang="ts">
import { OverlayScrollbarsComponent } from "#imports";
const tokenData = useTokenData();
const { width } = useWindowSize();

const { n } = useMagicKeys();

watchEffect(async () => {
    if (n.value) {
        // Wait 50ms
        await new Promise((resolve) => setTimeout(resolve, 50));
        useEvent("composer:open");
    }
});
</script>