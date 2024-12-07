<template>
    <div v-if="relation" class="rounded border overflow-auto max-h-72">
        <Note :note="relation.note" :hide-actions="true" :small-layout="true" />
    </div>

    <Input v-model:model-value="state.contentWarning" v-if="state.sensitive"
        placeholder="Put your content warning here" />

    <Textarea :placeholder="chosenSplash" v-model:model-value="state.content"
        class="!border-none !ring-0 !outline-none rounded-none p-0 max-h-full min-h-48 !ring-offset-0"
        :disabled="sending" />

    <div class="w-full flex flex-row gap-2 overflow-x-auto *:shrink-0 pb-2">
        <input type="file" ref="fileInput" @change="uploadFileFromEvent" class="hidden" multiple />
        <Files v-model:files="state.files" />
    </div>

    <DialogFooter class="items-center flex-row">
        <Tooltip>
            <TooltipTrigger as="div">
                <Button variant="ghost" size="icon">
                    <AtSign class="!size-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Mention someone</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger as="div">
                <Toggle variant="default" size="sm" :pressed="state.contentType === 'text/markdown'"
                    @update:pressed="i => state.contentType = i ? 'text/plain' : 'text/markdown'">
                    <LetterText class="!size-5" />
                </Toggle>
            </TooltipTrigger>
            <TooltipContent>
                <p>Enable Markdown</p>
            </TooltipContent>
        </Tooltip>
        <Select v-model:model-value="state.visibility">
            <SelectTrigger :as-child="true" :disabled="relation?.type === 'edit'">
                <Button variant="ghost" size="icon">
                    <component :is="visibilities[state.visibility].icon" class="!size-5" />
                </Button>
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="(v, k) in visibilities" :key="k" @click="state.visibility = k" :value="k">
                    <div class="flex flex-row gap-4 items-center w-full justify-between">
                        <div class="flex flex-col gap-1">
                            <span class="font-semibold">{{ v.name }}</span>
                            <span>{{ v.text }}</span>
                        </div>
                        <component :is="v.icon" class="!size-5" />
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
        <Tooltip>
            <TooltipTrigger as="div">
                <Button variant="ghost" size="icon">
                    <Smile class="!size-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Insert emoji</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger as="div">
                <Button variant="ghost" size="icon" @click="fileInput?.click()">
                    <FilePlus2 class="!size-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Attach a file</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger as="div">
                <Toggle variant="default" size="sm" v-model:pressed="state.sensitive">
                    <TriangleAlert class="!size-5" />
                </Toggle>
            </TooltipTrigger>
            <TooltipContent>
                <p>Mark as sensitive</p>
            </TooltipContent>
        </Tooltip>
        <Button type="submit" size="lg" class="ml-auto" :disabled="sending" @click="submit">
            <Loader v-if="sending" class="!size-5 animate-spin" />
            {{ relation?.type === "edit" ? "Save" : "Send" }}
        </Button>
    </DialogFooter>
</template>

<script lang="ts" setup>
import type { ResponseError } from "@versia/client";
import type { Status, StatusSource } from "@versia/client/types";
import {
    AtSign,
    FilePlus2,
    Globe,
    LetterText,
    Loader,
    Lock,
    LockOpen,
    Smile,
    TriangleAlert,
} from "lucide-vue-next";
import { SelectTrigger } from "radix-vue";
import { toast } from "vue-sonner";
import Note from "~/components/notes/note.vue";
import { Select, SelectContent, SelectItem } from "~/components/ui/select";
import { SettingIds } from "~/settings";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Toggle } from "../ui/toggle";
import Files from "./files.vue";

const { Control_Enter, Command_Enter } = useMagicKeys();
const ctrlEnterSend = useSetting(SettingIds.CtrlEnterToSend);
const fileInput = ref<HTMLInputElement | null>(null);

watch([Control_Enter, Command_Enter], () => {
    if (sending.value || !ctrlEnterSend.value.value) {
        return;
    }

    submit();
});

const { relation } = defineProps<{
    relation?: {
        type: "reply" | "quote" | "edit";
        note: Status;
        source?: StatusSource;
    };
}>();

const getMentions = () => {
    if (!relation || relation.type !== "reply") {
        return "";
    }

    const peopleToMention = relation.note.mentions
        .concat(relation.note.account)
        // Deduplicate mentions
        .filter((m, i, a) => a.indexOf(m) === i)
        // Remove self
        .filter((m) => m.id !== identity.value?.account.id);

    const mentions = peopleToMention.map((m) => `@${m.acct}`).join(" ");

    return `${mentions} `;
};

const state = reactive({
    // If editing, use the original content
    // If sending a reply, prefill with mentions
    content: relation?.source?.text || getMentions(),
    sensitive: relation?.type === "edit" ? relation.note.sensitive : false,
    contentWarning: relation?.type === "edit" ? relation.note.spoiler_text : "",
    contentType: "text/markdown" as "text/markdown" | "text/plain",
    visibility: (relation?.type === "edit"
        ? relation.note.visibility
        : "public") as Status["visibility"],
    files: (relation?.type === "edit"
        ? relation.note.media_attachments.map((m) => ({
              apiId: m.id,
              file: new File([], m.url),
              alt: m.description,
              uploading: false,
              updating: false,
          }))
        : []) as {
        apiId?: string;
        file: File;
        alt?: string;
        uploading: boolean;
        updating: boolean;
    }[],
});
const sending = ref(false);

const splashes = useConfig().COMPOSER_SPLASHES;
const chosenSplash = splashes[Math.floor(Math.random() * splashes.length)];

const submit = async () => {
    sending.value = true;

    try {
        if (relation?.type === "edit") {
            const { data } = await client.value.editStatus(relation.note.id, {
                status: state.content,
                content_type: state.contentType,
                sensitive: state.sensitive,
                spoiler_text: state.sensitive
                    ? state.contentWarning
                    : undefined,
                media_ids: state.files
                    .map((f) => f.apiId)
                    .filter((f) => f !== undefined),
            });

            useEvent("composer:send-edit", data);
            useEvent("composer:close");
        } else {
            const { data } = await client.value.postStatus(state.content, {
                content_type: state.contentType,
                sensitive: state.sensitive,
                spoiler_text: state.sensitive
                    ? state.contentWarning
                    : undefined,
                media_ids: state.files
                    .map((f) => f.apiId)
                    .filter((f) => f !== undefined),
                quote_id:
                    relation?.type === "quote" ? relation.note.id : undefined,
                in_reply_to_id:
                    relation?.type === "reply" ? relation.note.id : undefined,
                visibility: state.visibility,
            });

            useEvent("composer:send", data as Status);
            useEvent("composer:close");
        }
    } catch (_e) {
        const e = _e as ResponseError;
        toast.error(e.message);
    } finally {
        sending.value = false;
    }
};

const uploadFileFromEvent = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files ?? []);

    uploadFiles(files);

    target.value = "";
};

const uploadFiles = (files: File[]) => {
    for (const file of files) {
        state.files.push({
            file,
            uploading: true,
            updating: false,
        });

        client.value
            .uploadMedia(file)
            .then((media) => {
                const index = state.files.findIndex((f) => f.file === file);

                if (!state.files[index]) {
                    return;
                }

                state.files[index].apiId = media.data.id;
                state.files[index].uploading = false;
            })
            .catch(() => {
                const index = state.files.findIndex((f) => f.file === file);

                if (!state.files[index]) {
                    return;
                }

                state.files.splice(index, 1);
            });
    }
};

const visibilities = {
    public: {
        icon: Globe,
        name: "Public",
        text: "Can be seen by anyone.",
    },
    unlisted: {
        icon: LockOpen,
        name: "Unlisted",
        text: "Can be seen by anyone with the link.",
    },
    private: {
        icon: Lock,
        name: "Private",
        text: "Can only be seen by your followers.",
    },
    direct: {
        icon: AtSign,
        name: "Direct",
        text: "Can only be seen by mentioned users.",
    },
};
</script>