<template>
    <div class="flex flex-row gap-1 border-white/20">
        <Button title="Mention someone" @click="content = content + '@'">
            <iconify-icon height="1.5rem" width="1.5rem" icon="tabler:at" aria-hidden="true" />
        </Button>
        <Button title="Toggle Markdown" @click="markdown = !markdown" :toggled="markdown">
            <iconify-icon width="1.25rem" height="1.25rem"
                :icon="markdown ? 'tabler:markdown' : 'tabler:markdown-off'" aria-hidden="true" />
        </Button>
        <Button title="Use a custom emoji">
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:mood-smile" aria-hidden="true" />
        </Button>
        <Button title="Add media" @click="emit('filePickerOpen')">
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:photo-up" aria-hidden="true" />
        </Button>
        <Button title="Add a file" @click="emit('filePickerOpen')">
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:file-upload" aria-hidden="true" />
        </Button>
        <Button title="Add content warning" @click="cw = !cw" :toggled="cw">
            <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:rating-18-plus" aria-hidden="true" />
        </Button>
        <ButtonBase theme="primary" :loading="loading" @click="emit('send')" class="ml-auto rounded-full"
            :disabled="!canSubmit || loading">
            {{
                respondingType === "edit" ? "Edit!" : "Send!"
            }}
        </ButtonBase>
    </div>
</template>

<script lang="ts" setup>
import ButtonBase from "~/packages/ui/components/buttons/button.vue";
import Button from "./button.vue";

defineProps<{
    loading: boolean;
    canSubmit: boolean;
    respondingType: string | null;
}>();

const emit = defineEmits<{
    send: [];
    filePickerOpen: [];
}>();

const cw = defineModel<boolean>("cw", {
    required: true,
});
const content = defineModel<string>("content", {
    required: true,
});
const markdown = defineModel<boolean>("markdown", {
    required: true,
});
</script>