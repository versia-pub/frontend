<template>
    <div class="px-6 py-4">
        <div class="py-2 relative">
            <div v-if="respondingTo" class="mb-4">
                <span v-if="respondingType === 'reply'" class="text-gray-400 uppercase text-xs font-semibold">
                    <Icon name="tabler:arrow-back-up" class="h-4 w-4 text-gray-400 mb-0.5" aria-hidden="true" />
                    Replying to
                </span>
                <span v-else-if="respondingType === 'quote'" class="text-gray-400 uppercase text-xs font-semibold">
                    <Icon name="tabler:quote" class="h-4 w-4 text-gray-400" aria-hidden="true" />
                    Quoting
                </span>
                <OverlayScrollbarsComponent :defer="true" class="mt-2 max-h-72 overflow-y-auto">
                    <SocialElementsNotesNote :note="respondingTo" :small="true" :disabled="true" />
                </OverlayScrollbarsComponent>
            </div>
            <textarea :disabled="submitting" ref="textarea" v-model="content" :placeholder="chosenSplash"
                class="resize-none min-h-48 prose prose-invert max-h-[70dvh] w-full p-0 focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 bg-transparent appearance-none focus:!border-none focus:!outline-none disabled:cursor-not-allowed"></textarea>
            <div
                :class="['absolute bottom-0 right-0 p-2 text-gray-400 font-semibold text-xs', remainingCharacters < 0 && 'text-red-500']">
                {{ remainingCharacters }}
            </div>
        </div>
        <!-- Content warning textbox -->
        <div v-if="cw !== null" class="mb-4">
            <input type="text" placeholder="Add a content warning"
                class="w-full p-2 mt-1 text-sm prose prose-invert bg-dark-900 rounded focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 appearance-none focus:!border-none focus:!outline-none" />
        </div>
        <div class="flex flex-row gap-1 border-white/20">
            <ComposerButton title="Mention someone">
                <Icon name="tabler:at" class="size-6" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Toggle Markdown" @click="markdown = !markdown" :toggled="markdown">
                <Icon :name="markdown ? 'tabler:markdown' : 'tabler:markdown-off'" class="size-6" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Use a custom emoji">
                <Icon name="tabler:mood-smile" class="size-6" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add media">
                <Icon name="tabler:photo-up" class="size-6" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add a file">
                <Icon name="tabler:file-upload" class="size-6" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add content warning" @click="cw = cw === null ? '' : null" :toggled="cw !== null">
                <Icon name="tabler:rating-18-plus" class="size-6" aria-hidden="true" />
            </ComposerButton>
            <ButtonsPrimary :loading="submitting" @click="send" class="ml-auto rounded-full">
                <span>Send!</span>
            </ButtonsPrimary>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Instance } from "~/types/mastodon/instance";
import type { Status } from "~/types/mastodon/status";
import { OverlayScrollbarsComponent } from "#imports";

const textarea = ref<HTMLTextAreaElement | undefined>(undefined);
const { input: content } = useTextareaAutosize({
    element: textarea,
});
const { Control_Enter, Command_Enter, Control_Alt } = useMagicKeys();
const respondingTo = ref<Status | null>(null);
const respondingType = ref<"reply" | "quote" | null>(null);
const me = useMe();
const cw = ref(null as string | null);
const markdown = ref(true);

const splashes = useConfig().COMPOSER_SPLASHES;
const chosenSplash = ref(splashes[Math.floor(Math.random() * splashes.length)]);
watch(Control_Alt, () => {
    chosenSplash.value = splashes[Math.floor(Math.random() * splashes.length)];
});

onMounted(() => {
    useListen("composer:reply", (note: Status) => {
        respondingTo.value = note;
        respondingType.value = "reply";
        if (note.account.id !== me.value?.id)
            content.value = `@${note.account.acct} `;
        textarea.value?.focus();
    });

    useListen("composer:quote", (note: Status) => {
        respondingTo.value = note;
        respondingType.value = "quote";
        if (note.account.id !== me.value?.id)
            content.value = `@${note.account.acct} `;
        textarea.value?.focus();
    });
});

watchEffect(() => {
    if (Control_Enter.value || Command_Enter.value) {
        send();
    }
});

const props = defineProps<{
    instance: Instance;
}>();

const submitting = ref(false);
const tokenData = useTokenData();
const client = useMegalodon(tokenData);

const send = async () => {
    submitting.value = true;

    fetch(new URL("/api/v1/statuses", client.value?.baseUrl ?? "").toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.value?.access_token}`,
        },
        body: JSON.stringify({
            status: content.value.trim(),
            content_type: markdown.value ? "text/markdown" : "text/plain",
            in_reply_to_id:
                respondingType.value === "reply"
                    ? respondingTo.value?.id
                    : null,
            quote_id:
                respondingType.value === "quote"
                    ? respondingTo.value?.id
                    : null,
        }),
    })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error("Failed to send status");
            }

            content.value = "";
            submitting.value = false;
            useEvent("composer:send", await res.json());
        })
        .finally(() => {
            useEvent("composer:close");
        });
};

const characterLimit = computed(
    () => props.instance?.configuration.statuses.max_characters ?? 0,
);
const remainingCharacters = computed(
    () => characterLimit.value - (content.value?.length ?? 0),
);
</script>