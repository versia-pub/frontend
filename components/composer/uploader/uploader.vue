<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileInput" style="display: none" multiple />
        <div class="flex flex-row gap-2 overflow-x-auto *:shrink-0 p-1 mb-4" v-if="files.length > 0">
            <FilePreview v-for="data in files" :key="data.id" :file-data="data" @remove="removeFile"
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

const removeFile = (id: string) => {
    files.value = files.value.filter((data) => data.id !== id);
};

const updateAltText = (id: string, altText?: string) => {
    files.value = files.value.map((data) => {
        if (data.id === id) {
            return { ...data, uploading: true };
        }
        return data;
    });

    client.value
        ?.updateMedia(
            files.value.find((data) => data.id === id)?.api_id as string,
            { description: altText },
        )
        .then(() => {
            files.value = files.value.map((data) => {
                if (data.id === id) {
                    return { ...data, uploading: false };
                }
                return data;
            });
        });
};

const uploadFile = async (file: File) => {
    files.value = files.value.map((data) => {
        if (data.file === file) {
            return { ...data, uploading: true, progress: 0.1 };
        }
        return data;
    });

    client.value.uploadMedia(file).then((response) => {
        const attachment = response.data;

        files.value = files.value.map((data) => {
            if (data.file === file) {
                return {
                    ...data,
                    api_id: attachment.id,
                    uploading: false,
                    progress: 1.0,
                };
            }
            return data;
        });
    });
};
</script>