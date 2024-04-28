<template>
    <ClientOnly>
        <SocialElementsNotesNote v-if="note" :note="note" />
    </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "app",
})

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