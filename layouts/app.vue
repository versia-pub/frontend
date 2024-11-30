<template>
    <Sidebar>
        <SquarePattern />
        <slot />
    </Sidebar>
    <ComposerModal />
    <AttachmentDialog />
</template>

<script setup lang="ts">
import ComposerModal from "~/components/composer/modal.client.vue";
import SquarePattern from "~/components/graphics/square-pattern.vue";
import Sidebar from "~/components/sidebars/sidebar.vue";
import AttachmentDialog from "~/components/social-elements/notes/attachment-dialog.vue";

const { n } = useMagicKeys();
const activeElement = useActiveElement();
const notUsingInput = computed(
    () =>
        activeElement.value?.tagName !== "INPUT" &&
        activeElement.value?.tagName !== "TEXTAREA",
);

watchEffect(async () => {
    if (n?.value && notUsingInput.value) {
        // Wait 50ms
        await new Promise((resolve) => setTimeout(resolve, 50));
        useEvent("composer:open");
    }
});
</script>