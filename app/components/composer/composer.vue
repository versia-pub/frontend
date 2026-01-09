<template>
    <div v-if="relation" class="overflow-auto max-h-72">
        <Note :note="relation.note" :hide-actions="true" :small-layout="true" />
    </div>

    <InputGroup class="p-1">
        <InputGroupAddon
            v-if="store.sensitive"
            align="block-start"
            class="pt-3"
        >
            <Input
                v-model:model-value="store.contentWarning"
                placeholder="Put your content warning here"
            />
        </InputGroupAddon>

        <EditorContent
            data-slot="input-group-control"
            @paste-files="uploadFiles"
            v-model:content="store.content"
            v-model:raw-content="store.rawContent"
            :placeholder="getRandomSplash()"
            class=" placeholder:text-muted-foreground flex field-sizing-content min-h-58 w-full px-4 text-base disabled:opacity-50 md:text-sm flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none"
            :disabled="store.sending"
            :mode="store.contentType === 'text/html' ? 'rich' : 'plain'"
        />

        <InputGroupAddon
            v-if="store.files.length > 0"
            align="block-end"
            class="overflow-x-auto *:shrink-0"
        >
            <Files v-model:files="store.files" :composer-key="composerKey" />
        </InputGroupAddon>

        <InputGroupAddon align="block-end">
            <Select v-model:model-value="store.contentType">
                <SelectTrigger
                    as-child
                    disable-default-classes
                    disable-select-icon
                >
                    <InputGroupButton variant="ghost" size="icon-sm">
                        <LetterText v-if="store.contentType === 'text/html'" />
                        <Type v-else />
                    </InputGroupButton>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="text/plain">Plain text</SelectItem>
                    <SelectItem value="text/html">Rich text</SelectItem>
                </SelectContent>
            </Select>
            <VisibilityPicker v-model:visibility="store.visibility">
                <InputGroupButton
                    variant="ghost"
                    size="icon-sm"
                    :disabled="store.relation?.type === 'edit'"
                >
                    <component :is="visibilities[store.visibility].icon" />
                </InputGroupButton>
            </VisibilityPicker>
            <InputGroupButton
                variant="ghost"
                size="icon-sm"
                @click="fileInput?.click()"
            >
                <FilePlus2 />
            </InputGroupButton>
            <Toggle size="sm" v-model="store.sensitive">
                <TriangleAlert />
            </Toggle>
            <InputGroupText
                :class="['ml-auto', charactersLeft < 0 && 'text-destructive']"
            >
                {{ charactersLeft.toLocaleString(getLocale(), {
                    maximumFractionDigits: 2,
                    notation: 'compact',
                    compactDisplay: 'short',
                }) }}
            </InputGroupText>
            <Separator orientation="vertical" class="h-4!" />
            <InputGroupButton
                variant="default"
                size="icon-sm"
                :disabled="store.sending || !store.canSend"
                @click="send"
            >
                <Spinner v-if="store.sending" />
                <ArrowUp v-else />
                <span class="sr-only">Send</span>
            </InputGroupButton>
        </InputGroupAddon>
    </InputGroup>

    <input
        type="file"
        ref="fileInput"
        @change="uploadFileFromEvent"
        class="hidden"
        multiple
    >
</template>

<script lang="ts" setup>
import {
    ArrowUp,
    FilePlus2,
    LetterText,
    TriangleAlert,
    Type,
} from "lucide-vue-next";
import { Separator } from "reka-ui";
import Note from "~/components/notes/note.vue";
import { getLocale } from "~~/paraglide/runtime";
import EditorContent from "../editor/content.vue";
import { Input } from "../ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
} from "../ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Spinner } from "../ui/spinner";
import { Toggle } from "../ui/toggle";
import Files from "./files.vue";
import { visibilities } from "./visibilities";
import VisibilityPicker from "./visibility-picker.vue";

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
const authStore = useAuthStore();
const charactersLeft = computed(() => {
    const max = authStore.instance.configuration.statuses.max_characters;

    return max - store.rawContent.length;
});

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
