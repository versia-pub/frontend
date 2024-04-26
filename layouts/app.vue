<template>
    <div class="from-dark-600 to-dark-900 bg-gradient-to-tl min-h-dvh">
        <SidebarsNavigation />
        <div class="relative md:pl-20 min-h-dvh flex flex-row justify-center lg:justify-between">
            <aside
                class="max-w-md max-h-dvh overflow-y-auto w-full bg-dark-900 ring-1 ring-white/10 hidden lg:flex p-10 flex-col gap-10">
                <div class="grow">
                    <button type="button"
                        class="relative block w-full h-full rounded-lg border-2 border-dashed border-dark-300 p-12 text-center">
                        <Icon name="tabler:notification" class="mx-auto h-12 w-12 text-gray-400" />
                        <span class="mt-3 block text-sm font-semibold text-gray-200 max-w-56 mx-auto">Notifications will
                            appear here
                            when you
                            sign in</span>
                    </button>
                </div>
                <div class="mt-auto prose prose-invert prose-sm flex flex-col gap-4">
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

                    <NuxtLink href="/about/apps" target="_blank">
                        <ButtonsSecondary class="w-full">
                            Mobile apps
                        </ButtonsSecondary>
                    </NuxtLink>
                </div>
            </aside>
            <div class="w-full max-h-dvh overflow-y-auto">
                <slot />
            </div>
            <aside class="max-w-md max-h-dvh overflow-y-auto w-full bg-dark-900 ring-1 ring-white/10 lg:block hidden">
                <slot name="right">
                    <SocialElementsInstancePresentation />
                </slot>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import { convert } from "html-to-text";

const client = await useMegalodon();
const instance = await useInstance(client);
const description = await useExtendedDescription(client);

useServerSeoMeta({
    title: instance?.title,
    ogImage: instance?.banner,
    description: convert(description?.content ?? ""),
    ogSiteName: "Lysand",
    colorScheme: "dark",
    referrer: "no-referrer",
});
</script>