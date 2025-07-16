<template>
    <ComposerButton :tooltip="m.game_tough_seal_adore()">
        <Button variant="ghost" size="icon">
            <AtSign class="!size-5" />
        </Button>
    </ComposerButton>
    <ComposerButton :tooltip="m.plane_born_koala_hope()">
        <Toggle variant="default" size="sm" :model-value="contentType === 'text/html'" @update:model-value="
            (i) =>
                (contentType = i ? 'text/html' : 'text/plain')
        ">
            <LetterText class="!size-5" />
        </Toggle>
    </ComposerButton>
    <VisibilityPicker v-model:visibility="visibility">
        <Button variant="ghost" size="icon" :disabled="relation?.type === 'edit'">
            <component :is="visibilities[visibility].icon" />
        </Button>
    </VisibilityPicker>
    <ComposerButton :tooltip="m.blue_ornate_coyote_tickle()">
        <Button variant="ghost" size="icon">
            <Smile class="!size-5" />
        </Button>
    </ComposerButton>
    <ComposerButton :tooltip="m.top_patchy_earthworm_vent()">
        <Button variant="ghost" size="icon" @click="emit('pickFile')">
            <FilePlus2 class="!size-5" />
        </Button>
    </ComposerButton>
    <ComposerButton :tooltip="m.frail_broad_mallard_dart()">
        <Toggle variant="default" size="sm" v-model="sensitive">
            <TriangleAlert class="!size-5" />
        </Toggle>
    </ComposerButton>
    <CharacterCounter class="ml-auto" :max="(identity as Identity).instance.configuration.statuses.max_characters" :current="rawContent.length" />
    <Button type="submit" size="lg" :disabled="sending || !canSend" @click="emit('submit')">
        <Loader v-if="sending" class="!size-5 animate-spin" />
        {{
            relation?.type === "edit"
                ? m.gaudy_strong_puma_slide()
                : m.free_teal_bulldog_learn()
        }}
    </Button>
</template>

<script lang="ts" setup>
import {
    AtSign,
    FilePlus2,
    LetterText,
    Loader,
    Smile,
    TriangleAlert,
} from "lucide-vue-next";
import * as m from "~~/paraglide/messages.js";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import ComposerButton from "./button.vue";
import CharacterCounter from "./character-counter.vue";
import { type ComposerState, visibilities } from "./composer";
import VisibilityPicker from "./visibility-picker.vue";

const { relation, sending, canSend, rawContent } = defineProps<{
    relation?: ComposerState["relation"];
    sending: boolean;
    canSend: boolean;
    rawContent: string;
}>();

const contentType = defineModel<ComposerState["contentType"]>("contentType", {
    required: true,
});
const visibility = defineModel<ComposerState["visibility"]>("visibility", {
    required: true,
});
const sensitive = defineModel<ComposerState["sensitive"]>("sensitive", {
    required: true,
});

const emit = defineEmits<{
    submit: [];
    pickFile: [];
}>();
</script>
