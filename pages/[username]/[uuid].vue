<template>
    <ClientOnly>
        <div v-if="note" class="max-w-2xl mx-auto md:py-20 md:px-10">
            <SocialElementsNotesNote :note="note" />
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const client = useMegalodon();
const uuid = route.params.uuid as string;

const note = useNote(client, uuid);

useServerSeoMeta({
    title: note.value?.account.display_name,
    description: note.value?.content,
    ogImage: note.value?.media_attachments[0]?.preview_url,
});
</script>