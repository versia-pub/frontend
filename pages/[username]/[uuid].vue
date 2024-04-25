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
const client = await useMegalodon();
const uuid = route.params.uuid as string;

const note = await useNote(client, uuid);
</script>