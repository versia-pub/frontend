<template>
    <div
        v-if="loaded"
        class="mx-auto max-w-2xl w-full rounded overflow-hidden border divide-border divide-y"
    >
        <div>
            <Note
                v-for="(note, index) of context?.ancestors"
                :note="note"
                :hide-actions="true"
                :top-avatar-bar="index !== 0"
                :bottom-avatar-bar="true"
                :content-under-username="true"
            />
            <Note v-if="note" :note="note" :top-avatar-bar="(context?.ancestors.length ?? 0) > 0" />
        </div>
        <Note v-for="note of context?.descendants" :note="note" />
    </div>

    <div v-else class="p-4 flex items-center justify-center h-48">
        <Spinner />
    </div>
</template>

<script setup lang="ts">
import { Loader } from "lucide-vue-next";
import Spinner from "~/components/graphics/spinner.vue";
import Note from "~/components/notes/note.vue";
import * as m from "~/paraglide/messages.js";

definePageMeta({
    layout: "app",
    breadcrumbs: () => [
        {
            text: m.chunky_awake_mallard_grow(),
        },
    ],
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

useSeoMeta({
    title: computed(() =>
        note.value
            ? note.value.account.display_name
            : m.steep_sour_warthog_aim(),
    ),
    description: computed(() => (note.value ? note.value.content : undefined)),
    ogImage: computed(() =>
        note.value ? note.value.media_attachments[0]?.preview_url : undefined,
    ),
    robots: computed(() => ({
        noindex: !!note.value?.account.noindex,
        nofollow: !!note.value?.account.noindex,
        noarchive: !!note.value?.account.noindex,
        noimageindex: !!note.value?.account.noindex,
    })),
});
</script>
