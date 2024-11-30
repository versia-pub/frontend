<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileInput" style="display: none" multiple />
        <div class="flex flex-row gap-2 overflow-x-auto *:shrink-0 p-1 mb-4" v-if="files.length > 0">
            <FilePreview v-for="data in files" :key="data.id" :file-data="data" @remove="(id: string) => emit('removeFile', id)"
                @update-alt-text="updateAltText" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nanoid } from "nanoid";
import FilePreview from "./file-preview.vue";

const files = defineModel<FileData[]>("files", {
    required: true,
});

export interface FileData {
    id: string;
    file: File;
    uploading: boolean;
    progress: number;
    api_id?: string;
    alt_text?: string;
}

const fileInput = ref<HTMLInputElement | null>(null);

const openFilePicker = () => {
    fileInput.value?.click();
};

defineExpose({
    openFilePicker,
});

const emit = defineEmits<{
    changeFile: [changedFile: FileData];
    addFile: [newFile: FileData];
    removeFile: [id: string];
}>();

const handleFileInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        files.value.push(
            ...Array.from(target.files).map((file) => ({
                id: nanoid(),
                file,
                progress: 0,
                uploading: true,
            })),
        );
    }
};

// Upload new files (not existing, currently being uploaded files)
watch(
    files,
    (newFiles) => {
        for (const data of newFiles) {
            if (data.progress === 0) {
                uploadFile(data.file);
            }
        }
    },
    {
        deep: true,
    },
);

const updateAltText = (id: string, altText?: string) => {
    const foundFile = files.value.find((data) => data.id === id);

    if (!foundFile) {
        throw new Error("File with ID doesn't exist");
    }

    emit("changeFile", {
        ...foundFile,
        uploading: true,
    });

    client.value
        ?.updateMedia(foundFile.api_id as string, { description: altText })
        .then(() => {
            emit("changeFile", {
                ...foundFile,
                uploading: false,
            });
        });
};

const uploadFile = async (file: File) => {
    const foundFile = files.value.find((data) => data.file === file);

    if (!foundFile) {
        throw new Error("File doesn't exist");
    }

    emit("changeFile", {
        ...foundFile,
        uploading: true,
        progress: 0.1,
    });

    client.value.uploadMedia(file).then((response) => {
        const attachment = response.data;

        emit("changeFile", {
            ...foundFile,
            uploading: false,
            progress: 1.0,
            api_id: attachment.id,
        });
    });
};
</script>