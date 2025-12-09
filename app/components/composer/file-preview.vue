<template>
    <DropdownMenu>
        <DropdownMenuTrigger
            as="button"
            :disabled="file.uploading || file.updating"
            class="block bg-card text-card-foreground shadow-sm h-28 overflow-hidden rounded relative min-w-28 *:disabled:opacity-50"
        >
            <img
                v-if="file.file?.type.startsWith('image/')"
                :src="createObjectURL(file.file)"
                class="object-contain h-28 w-full"
                :alt="file.alt"
            >
            <FileIcon v-else class="size-6 m-auto text-muted-foreground"/>
            <Badge
                v-if="file.file && !(file.uploading || file.updating)"
                class="absolute bottom-1 right-1"
                variant="default"
            >
                {{ formatBytes(file.file.size) }}
            </Badge>
            <Spinner
                v-else-if="file.file"
                class="absolute bottom-1 right-1 size-8 p-1.5"
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-48">
            <DropdownMenuLabel v-if="file.file">
                {{ file.file.name }}
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem @click="editCaption">
                <Captions/>
                Add caption
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem @click="emit('remove')">
                <Delete/>
                Remove
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { Captions, Delete, FileIcon } from "lucide-vue-next";
import Spinner from "~/components/graphics/spinner.vue";
import { confirmModalService } from "~/components/modals/composable.ts";
import { Badge } from "~/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { ComposerStateKey } from "~/stores/composer";

const { composerKey } = defineProps<{
    composerKey: ComposerStateKey;
}>();

const file = defineModel<ComposerFile>("file", {
    required: true,
});

const composerStore = useComposerStore(composerKey)();

const emit = defineEmits<{
    remove: [];
}>();

const editCaption = async () => {
    const result = await confirmModalService.confirm({
        title: "Enter a caption",
        message:
            "Captions are useful for people with visual impairments, or when the image can't be displayed.",
        defaultValue: file.value.alt,
        confirmText: "Add",
        inputType: "textarea",
    });

    if (result.confirmed) {
        await composerStore.updateFileDescription(
            file.value.id,
            result.value ?? "",
        );
    }
};

const createObjectURL = URL.createObjectURL;

const formatBytes = (bytes: number) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const k = 1000;
    const digitsAfterPoint = 2;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(digitsAfterPoint))} ${
        sizes[i]
    }`;
};
</script>
