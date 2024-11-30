<template>
    <RichTextboxInput v-model:model-content="content" @paste="handlePaste" :disabled="loading"
        :placeholder="chosenSplash" :max-characters="characterLimit" class="focus:!ring-0 max-h-[70dvh]" />
</template>

<script lang="ts" setup>
import RichTextboxInput from "../inputs/rich-textbox-input.vue";

defineProps<{
    loading: boolean;
    chosenSplash: string;
    characterLimit: number;
    handlePaste: (event: ClipboardEvent) => void;
}>();

const content = defineModel<string>("content", {
    required: true,
});
</script>