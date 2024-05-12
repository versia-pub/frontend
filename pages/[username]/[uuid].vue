<template>
    <ClientOnly>
        <OverlayScrollbarsComponent v-if="loaded" :defer="true" class="max-h-dvh min-h-dvh overflow-y-auto pb-72">
            <SocialElementsNotesNote v-for="note of context?.ancestors" :note="note" />
            <div ref="element" class="first:rounded-t last:rounded-b overflow-hidden">
                <SocialElementsNotesNote class="!rounded-none border-2 border-pink-500" v-if="note" :note="note" />
            </div>
            <SocialElementsNotesNote v-for="note of context?.descendants" :note="note" />
        </OverlayScrollbarsComponent>
        <OverlayScrollbarsComponent :defer="true" v-else class="max-h-dvh min-h-dvh overflow-y-auto">
            <SocialElementsNotesNote v-for="_ of 5" :skeleton="true" />
        </OverlayScrollbarsComponent>
    </ClientOnly>
</template>

<script setup lang="ts">
import { OverlayScrollbarsComponent } from "#imports";
definePageMeta({
    layout: "app",
});

const element = ref<HTMLElement | null>(null);
const route = useRoute();
const client = useMegalodon();
const uuid = route.params.uuid as string;

const note = useNote(client, uuid);
const noteId = computed(() => note.value?.id ?? null);
const context = useNoteContext(client, noteId);
const loaded = computed(() => note.value !== null && context.value !== null);

// If ancestors changes, scroll down so that the initial note stays at the same place
watch(
    [() => context.value?.ancestors, loaded],
    async () => {
        if (context.value?.ancestors.length === 0) return;
        if (!loaded.value) return;
        await nextTick();
        // Wait for 200ms
        await new Promise((resolve) => setTimeout(resolve, 200));
        element.value?.scrollIntoView({
            behavior: "smooth",
        });
    },
    {
        immediate: true,
    },
);

useServerSeoMeta({
    title: note.value?.account.display_name,
    description: note.value?.content,
    ogImage: note.value?.media_attachments[0]?.preview_url,
});
</script>