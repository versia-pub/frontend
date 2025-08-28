<template>
    <div v-if="relation" class="overflow-auto max-h-72">
        <Note :note="relation.note" :hide-actions="true" :small-layout="true" />
    </div>

    <ContentWarning v-if="store.sensitive" v-model="store.contentWarning" />

    <EditorContent @paste-files="uploadFiles" v-model:content="store.content" v-model:raw-content="store.rawContent" :placeholder="getRandomSplash()"
        class="[&>.tiptap]:!border-none [&>.tiptap]:!ring-0 [&>.tiptap]:!outline-none [&>.tiptap]:rounded-none p-0 [&>.tiptap]:max-h-[50dvh] [&>.tiptap]:overflow-y-auto [&>.tiptap]:min-h-48 [&>.tiptap]:!ring-offset-0 [&>.tiptap]:h-full"
        :disabled="store.sending" :mode="store.contentType === 'text/html' ? 'rich' : 'plain'" />

    <div class="w-full flex flex-row gap-2 overflow-x-auto *:shrink-0 pb-2">
        <input type="file" ref="fileInput" @change="uploadFileFromEvent" class="hidden" multiple />
        <Files v-model:files="store.files" :composer-key="composerKey" />
    </div>

    <DialogFooter class="items-center flex-row overflow-x-auto">
        <ComposerButtons @submit="send" @pick-file="fileInput?.click()" v-model:content-type="store.contentType" v-model:sensitive="store.sensitive" v-model:visibility="store.visibility" :relation="store.relation" :sending="store.sending" :can-send="store.canSend" :raw-content="store.rawContent" />
    </DialogFooter>
</template>

<script lang="ts" setup>
import Note from "~/components/notes/note.vue";
import EditorContent from "../editor/content.vue";
import { DialogFooter } from "../ui/dialog";
import ComposerButtons from "./buttons.vue";
import ContentWarning from "./content-warning.vue";
import Files from "./files.vue";

const props = defineProps<{
    relation?: ComposerState["relation"];
}>();

const { Control_Enter, Command_Enter } = useMagicKeys();
const { play } = useAudio();
const fileInput = useTemplateRef<HTMLInputElement>("fileInput");
const composerKey = props.relation
    ? (`${props.relation.type}-${props.relation.note.id}` as const)
    : "blank";
const store = useComposerStore(composerKey)();

watch([Control_Enter, Command_Enter], () => {
    if (store.sending || !preferences.ctrl_enter_send.value) {
        return;
    }

    send();
});

const getRandomSplash = (): string => {
    const splashes = useConfig().COMPOSER_SPLASHES;

    return splashes[Math.floor(Math.random() * splashes.length)] as string;
};

const send = async () => {
    const result =
        store.relation?.type === "edit"
            ? await store.sendEdit()
            : await store.send();

    if (result) {
        play("publish");
        store.$reset();
        useEvent("composer:close");
    }
};

watch(
    props,
    async (props) => {
        if (props.relation && !store.relation) {
            store.stateFromRelation(
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
        store.uploadFile(file);
    }

    target.value = "";
};

const uploadFiles = (files: File[]) => {
    for (const file of files) {
        store.uploadFile(file);
    }
};
</script>
