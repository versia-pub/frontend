<template>
    <Sidebar>
        <slot v-if="!route.meta.requiresAuth || identity" />
        <Card v-else class="shadow-none border-none p-4 max-w-md mx-auto">
            <CardHeader class="text-center gap-y-4">
                <CardTitle>{{ m.sunny_quick_lionfish_flip() }}</CardTitle>
                <CardDescription>
                    {{ m.brave_known_pelican_drip() }}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant="secondary" class="w-full" @click="signInAction">
                    {{ m.fuzzy_sea_moth_absorb() }}
                </Button>
            </CardFooter>
        </Card>
    </Sidebar>
    <MobileNavbar v-if="identity" />
    <ComposerDialog />
</template>

<script setup lang="ts">
import ComposerDialog from "~/components/composer/dialog.vue";
import MobileNavbar from "~/components/navigation/mobile-navbar.vue";
import Sidebar from "~/components/sidebars/sidebar.vue";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import * as m from "~/paraglide/messages.js";
import { SettingIds } from "~/settings";

const appData = useAppData();
const signInAction = async () => signIn(appData, await askForInstance());
const colorMode = useColorMode();
const themeSetting = useSetting(SettingIds.Theme);
const { n, d } = useMagicKeys();
const activeElement = useActiveElement();
const notUsingInput = computed(
    () =>
        activeElement.value?.tagName !== "INPUT" &&
        activeElement.value?.tagName !== "TEXTAREA" &&
        activeElement.value?.contentEditable !== "true",
);

const backgroundImage = useSetting(SettingIds.BackgroundURL);
const canParseUrl = URL.canParse;

const route = useRoute();

watch([n, notUsingInput, d], async () => {
    if (n?.value && notUsingInput.value) {
        // Wait 50ms
        await new Promise((resolve) => setTimeout(resolve, 50));
        useEvent("composer:open");
    }

    if (d?.value && notUsingInput.value && !colorMode.forced) {
        // Swap theme from dark to light or vice versa
        if (colorMode.value === "dark") {
            colorMode.preference = "light";
            themeSetting.value.value = "light";
        } else {
            colorMode.preference = "dark";
            themeSetting.value.value = "dark";
        }
    }
});
</script>
