<template>
    <div v-if="loaded" :defer="true" class="mx-auto max-w-2xl w-full pb-72">
        <Note v-for="note of context?.ancestors" :note="note" />
        <div ref="element" class="first:rounded-t last:rounded-b overflow-hidden">
            <Note class="!rounded-none border-2 -m-[2px] border-primary-500" v-if="note" :note="note" />
        </div>
        <Note v-for="note of context?.descendants" :note="note" />
    </div>
    <!-- <div v-else class="mx-auto max-w-2xl w-full overflow-y-auto">
        <Note v-for="_ of 5" :skeleton="true" />
    </div> -->
</template>

<script setup lang="ts">
import Note from "~/components/notes/note.vue";

definePageMeta({
    layout: "app",
});

const element = ref<HTMLElement | null>(null);
const route = useRoute();
const uuid = route.params.uuid as string;

const note = useNote(client, uuid);
const noteId = computed(() => note.value?.id ?? null);
const context = useNoteContext(client, noteId);
const loaded = computed(() => note.value !== null && context.value !== null);

// If ancestors changes, scroll down so that the initial note stays at the same place
watch(
    [() => context.value?.ancestors, loaded],
    async () => {
        if (context.value?.ancestors.length === 0) {
            return;
        }
        if (!loaded.value) {
            return;
        }
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
    robots: computed(() => ({
        noindex: !!note.value?.account.noindex,
        nofollow: !!note.value?.account.noindex,
        noarchive: !!note.value?.account.noindex,
        noimageindex: !!note.value?.account.noindex,
    })),
});
</script>