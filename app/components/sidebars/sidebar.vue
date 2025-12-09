<script setup lang="ts">
import Timelines from "~/components/navigation/timelines.vue";
import LeftSidebar from "./left-sidebar.vue";
import RightSidebar from "./right-sidebar.vue";

const route = useRoute();
const isMd = useMediaQuery("(max-width: 768px)");
const showTimelines = computed(
    () =>
        ["/", "/home", "/local", "/public", "/global"].includes(route.path) &&
        isMd.value,
);
const authStore = useAuthStore();
</script>

<template>
    <LeftSidebar/>
    <main class="grow h-dvh overflow-y-auto">
        <header
            v-if="showTimelines"
            class="flex h-16 items-center bg-background/80 backdrop-blur-2xl sticky top-0 inset-x-0 z-10 p-4"
        >
            <Timelines/>
        </header>
        <slot/>
    </main>
    <RightSidebar
        v-if="authStore.isSignedIn"
        v-show="preferences.display_notifications_sidebar"
    />
</template>
