<template>
    <SidebarProvider>
        <AppSidebar>
            <slot v-if="!route.meta.requiresAuth || identity" />
            <AuthRequired v-else />
        </AppSidebar>
    </SidebarProvider>
    <MobileNavbar v-if="identity" />
    <ComposerDialog />
</template>

<script setup lang="ts">
import ComposerDialog from "~/components/composer/dialog.vue";
import AuthRequired from "~/components/errors/AuthRequired.vue";
import MobileNavbar from "~/components/navigation/mobile-navbar.vue";
import AppSidebar from "~/components/sidebars/sidebar.vue";
import { SidebarProvider } from "~/components/ui/sidebar";
import { SettingIds } from "~/settings";

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
