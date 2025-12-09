<template>
    <SidebarProvider>
        <AppSidebar>
            <slot/>
        </AppSidebar>
    </SidebarProvider>
    <MobileNavbar v-if="authStore.isSignedIn"/>
    <Preferences/>
    <ComposerDialog v-if="authStore.isSignedIn"/>
</template>

<script setup lang="ts">
import ComposerDialog from "~/components/composer/dialog.vue";
import MobileNavbar from "~/components/navigation/mobile-navbar.vue";
import Preferences from "~/components/preferences/index.vue";
import AppSidebar from "~/components/sidebars/sidebar.vue";
import { SidebarProvider } from "~/components/ui/sidebar";

const colorMode = useColorMode();
const { n, d } = useMagicKeys();
const activeElement = useActiveElement();
const authStore = useAuthStore();
const notUsingInput = computed(
    () =>
        activeElement.value?.tagName !== "INPUT" &&
        activeElement.value?.tagName !== "TEXTAREA" &&
        activeElement.value?.contentEditable !== "true",
);
const route = useRoute();

watch(
    () => route.path,
    async () => {
        console.log(route.meta.requiresAuth && !authStore.isSignedIn);
        if (route.meta.requiresAuth && !authStore.isSignedIn) {
            window.location.href = "/";
        }
    },
    { immediate: true },
);

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
            preferences.color_theme.value = "light";
        } else {
            colorMode.preference = "dark";
            preferences.color_theme.value = "dark";
        }
    }
});
</script>
