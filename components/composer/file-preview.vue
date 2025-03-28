<template>
    <DropdownMenu>
        <DropdownMenuTrigger
            as="button"
            :disabled="file.uploading || file.updating"
            class="block bg-card text-card-foreground shadow-sm h-28 overflow-hidden rounded relative min-w-28 *:disabled:opacity-50"
        >
            <Avatar class="h-28 w-full" shape="square">
                <AvatarImage
                    class="!object-contain"
                    :src="createObjectURL(file.file)"
                />
            </Avatar>
            <Badge
                v-if="file.uploading && !file.updating"
                class="absolute bottom-1 right-1"
                variant="default"
                >{{ formatBytes(file.file.size) }}</Badge
            >
            <Spinner v-else class="absolute bottom-1 right-1 size-8 p-1.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-48">
            <DropdownMenuLabel>{{ file.file.name }}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem @click="editName">
                <TextCursorInput />
                <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="editCaption">
                <Captions />
                <span>Add caption</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="emit('remove')">
                <Delete />
                <span>Remove</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { Captions, Delete, Loader, TextCursorInput } from "lucide-vue-next";
import Spinner from "~/components/graphics/spinner.vue";
import { confirmModalService } from "~/components/modals/composable.ts";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const file = defineModel<{
    apiId?: string;
    file: File;
    alt?: string;
    uploading: boolean;
    updating: boolean;
}>("file", {
    required: true,
});

const emit = defineEmits<{
    remove: [];
}>();

const editName = async () => {
    const result = await confirmModalService.confirm({
        title: "Enter a new name",
        defaultValue: file.value.file.name,
        confirmText: "Edit",
        inputType: "text",
    });

    if (result.confirmed) {
        file.value.updating = true;
        file.value.file = new File(
            [file.value.file],
            result.value ?? file.value.file.name,
            {
                type: file.value.file.type,
                lastModified: file.value.file.lastModified,
            },
        );

        try {
            await client.value.updateMedia(file.value.apiId ?? "", {
                file: file.value.file,
            });
        } finally {
            file.value.updating = false;
        }
    }
};

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
        file.value.updating = true;
        file.value.alt = result.value;

        try {
            await client.value.updateMedia(file.value.apiId ?? "", {
                description: file.value.alt,
            });
        } finally {
            file.value.updating = false;
        }
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
