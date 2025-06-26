<template>
    <div v-if="relation" class="overflow-auto max-h-72">
        <Note :note="relation.note" :hide-actions="true" :small-layout="true" />
    </div>

    <ContentWarning v-if="state.sensitive" v-model="state.contentWarning" />

    <EditorContent @paste-files="uploadFiles" v-model:content="state.content" v-model:raw-content="state.rawContent" :placeholder="getRandomSplash()"
        class="*:!border-none *:!ring-0 *:!outline-none *:rounded-none p-0 *:max-h-[50dvh] *:overflow-y-auto *:min-h-48 *:!ring-offset-0 *:h-full"
        :disabled="state.sending" :mode="state.contentType === 'text/html' ? 'rich' : 'plain'" />

    <div class="w-full flex flex-row gap-2 overflow-x-auto *:shrink-0 pb-2">
        <input type="file" ref="fileInput" @change="uploadFileFromEvent" class="hidden" multiple />
        <Files v-model:files="state.files" />
    </div>

    <DialogFooter class="items-center flex-row overflow-x-auto">
        <ComposerButtons @submit="send" @pick-file="fileInput?.click()" v-model:content-type="state.contentType" v-model:sensitive="state.sensitive" v-model:visibility="state.visibility" :relation="state.relation" :sending="state.sending" :can-send="state.canSend" :raw-content="state.rawContent" />
    </DialogFooter>
</template>

<script lang="ts" setup>
import Note from "~/components/notes/note.vue";
import EditorContent from "../editor/content.vue";
import { DialogFooter } from "../ui/dialog";
import ComposerButtons from "./buttons.vue";
import {
    type ComposerState,
    getRandomSplash,
    send,
    state,
    stateFromRelation,
    uploadFile,
} from "./composer";
import ContentWarning from "./content-warning.vue";
import Files from "./files.vue";

const { Control_Enter, Command_Enter } = useMagicKeys();
const fileInput = useTemplateRef<HTMLInputElement>("fileInput");

watch([Control_Enter, Command_Enter], () => {
    if (state.sending || !preferences.ctrl_enter_send.value) {
        return;
    }

    send();
});

const props = defineProps<{
    relation?: ComposerState["relation"];
}>();

watch(
    props,
    async (props) => {
        if (props.relation) {
            await stateFromRelation(
                props.relation.type,
                props.relation.note,
                props.relation.source,
            );
        }
    },
    { immediate: true },
);

const uploadFileFromEvent = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files ?? []);

    for (const file of files) {
        uploadFile(file);
    }

    target.value = "";
};

const uploadFiles = (files: File[]) => {
    for (const file of files) {
        uploadFile(file);
    }
};
</script>
