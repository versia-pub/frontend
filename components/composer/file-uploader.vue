<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileInput" style="display: none" multiple />
        <div class="flex flex-row gap-2 overflow-x-auto *:shrink-0 p-1 mb-4" v-if="files.length > 0">
            <div v-for="(data) in files" :key="data.id" role="button" tabindex="0"
                :class="['size-28 bg-dark-800 rounded flex items-center relative justify-center ring-1 ring-white/20 overflow-hidden', data.progress !== 1.0 && 'animate-pulse']"
                @keydown.enter="removeFile(data.id)">
                <template v-if="data.file.type.startsWith('image/')">
                    <img :src="createObjectURL(data.file)" class="w-full h-full object-cover cursor-default"
                        alt="Preview of file" />
                </template>
                <template v-else-if="data.file.type.startsWith('video/')">
                    <video :src="createObjectURL(data.file)" class="w-full h-full object-cover cursor-default"></video>
                </template>
                <template v-else>
                    <iconify-icon :icon="getIcon(data.file.type)" width="none" class="size-6" />
                </template>
                <!-- Shadow on media to better see buttons -->
                <div class="absolute inset-0 bg-black/70"></div>
                <div class="absolute bottom-1 right-1 p-1 bg-dark-800 text-white text-xs rounded cursor-default flex flex-row items-center gap-x-1"
                    aria-label="File size">
                    {{ formatBytes(data.file.size) }}
                    <!-- Loader spinner -->
                    <iconify-icon v-if="data.progress < 1.0" icon="tabler:loader-2" width="none"
                        class="size-4 animate-spin text-primary-500" />
                </div>
                <button class="absolute top-1 right-1 p-1 bg-dark-800 text-white text-xs rounded size-6" role="button"
                    tabindex="0" @pointerup="removeFile(data.id)" @keydown.enter="removeFile(data.id)">
                    <iconify-icon icon="tabler:x" width="none" class="size-4" />
                </button>
                <!-- Alt text editor -->
                <Popover.Root :positioning="{
                    strategy: 'fixed',
                }" v-if="data.api_id" @update:open="o => !o && updateAltText(data.id, data.alt_text)">
                    <Popover.Trigger aria-hidden="true"
                        class="absolute top-1 left-1 p-1 bg-dark-800 ring-1 ring-white/5 text-white text-xs rounded size-6">
                        <iconify-icon icon="tabler:alt" width="none" class="size-4" />
                    </Popover.Trigger>
                    <Popover.Positioner class="!z-[100]">
                        <Popover.Content
                            class="p-1 bg-dark-400 rounded text-sm ring-1 ring-white/10 shadow-lg text-gray-300 !min-w-72">
                            <textarea :disabled="data.progress < 1.0" @keydown.enter.stop v-model="data.alt_text"
                                placeholder="Add alt text"
                                class="w-full p-2 text-sm prose prose-invert bg-dark-900 rounded focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 appearance-none focus:!border-none focus:!outline-none" />
                            <ButtonSecondary @click="updateAltText(data.id, data.alt_text)" class="w-full"
                                :loading="data.progress < 1.0">
                                <span>Edit</span>
                            </ButtonSecondary>
                        </Popover.Content>
                    </Popover.Positioner>
                </Popover.Root>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Popover } from "@ark-ui/vue";
import { nanoid } from "nanoid";
import ButtonSecondary from "../buttons/button-secondary.vue";

const files = defineModel<
    {
        id: string;
        file: File;
        // 0.0 -> Not uploading
        // 0.5 -> Uploading
        // 1.0 -> Uploaded
        progress: number;
        api_id?: string;
        alt_text?: string;
    }[]
>("files", {
    required: true,
});

const client = useClient();
const fileInput = ref<HTMLInputElement | null>(null);

const openFilePicker = () => {
    fileInput.value?.click();
};

defineExpose({
    openFilePicker,
});

const createObjectURL = URL.createObjectURL;

const handleFileInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        files.value.push(
            ...Array.from(target.files).map((file) => ({
                id: nanoid(),
                file,
                progress: 0,
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
    // Set loading
    files.value = files.value.map((data) => {
        if (data.id === id) {
            return { ...data, progress: 0.5 };
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
                    return { ...data, progress: 1.0 };
                }
                return data;
            });
        });
};

const getIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
        return "tabler:photo";
    }
    if (mimeType.startsWith("video/")) {
        return "tabler:video";
    }
    if (mimeType.startsWith("audio/")) {
        return "tabler:music";
    }
    return "tabler:file";
};

const formatBytes = (bytes: number) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const k = 1000;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

const removeFile = (id: string) => {
    files.value = files.value.filter((data) => data.id !== id);
};

const uploadFile = async (file: File) => {
    files.value = files.value.map((data) => {
        if (data.file === file) {
            return { ...data, progress: 0.5 };
        }
        return data;
    });

    client.value.uploadMedia(file).then((response) => {
        const attachment = response.data;

        files.value = files.value.map((data) => {
            if (data.file === file) {
                return { ...data, api_id: attachment.id, progress: 1.0 };
            }
            return data;
        });
    });
};
</script>