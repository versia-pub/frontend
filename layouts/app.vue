<template>
    <div class="from-dark-600 to-dark-900 bg-gradient-to-tl relative min-h-dvh">
        <SquarePattern />
        <Navigation />

        <div class="relative md:pl-20 min-h-dvh flex flex-row overflow-hidden justify-center xl:justify-between">
            <OverlayScrollbarsComponent :defer="true" class="w-full max-h-dvh overflow-y-auto" :element="'main'">
                <slot />
            </OverlayScrollbarsComponent>
            <CollapsibleAside v-if="width > 1280 && identity" direction="right"
                class="max-w-md max-h-dvh overflow-y-auto w-full hidden absolute inset-y-0 xl:flex">
                <TimelineScroller>
                    <Notifications />
                </TimelineScroller>
            </CollapsibleAside>
        </div>
    </div>
    <ComposerModal />
    <AttachmentDialog />
</template>

<script setup lang="ts">
import ComposerModal from "~/components/composer/modal.client.vue";
import SquarePattern from "~/components/graphics/square-pattern.vue";
import CollapsibleAside from "~/components/sidebars/collapsible-aside.vue";
import Navigation from "~/components/sidebars/navigation.vue";
import AttachmentDialog from "~/components/social-elements/notes/attachment-dialog.vue";
import Notifications from "~/components/timelines/notifications.vue";
import TimelineScroller from "~/components/timelines/timeline-scroller.vue";
import { OverlayScrollbarsComponent } from "#imports";
const { width } = useWindowSize();

const { n } = useMagicKeys();
const activeElement = useActiveElement();
const notUsingInput = computed(
    () =>
        activeElement.value?.tagName !== "INPUT" &&
        activeElement.value?.tagName !== "TEXTAREA",
);
const identity = useCurrentIdentity();

watchEffect(async () => {
    if (n?.value && notUsingInput.value) {
        // Wait 50ms
        await new Promise((resolve) => setTimeout(resolve, 50));
        useEvent("composer:open");
    }
});
</script>