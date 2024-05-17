<template>
    <div class="px-6 py-4">
        <div class="py-2 relative">
            <div v-if="respondingTo" class="mb-4">
                <span v-if="respondingType === 'reply'" class="text-gray-400 uppercase text-xs font-semibold">
                    <iconify-icon width="1rem" height="1rem" icon="tabler:arrow-back-up" class="text-gray-400 mb-0.5"
                        aria-hidden="true" />
                    Replying to
                </span>
                <span v-else-if="respondingType === 'quote'" class="text-gray-400 uppercase text-xs font-semibold">
                    <iconify-icon width="1rem" height="1rem" icon="tabler:quote" class="text-gray-400"
                        aria-hidden="true" />
                    Quoting
                </span>
                <OverlayScrollbarsComponent :defer="true" class="mt-2 max-h-72 overflow-y-auto">
                    <LazySocialElementsNotesNote :note="respondingTo" :small="true" :disabled="true" />
                </OverlayScrollbarsComponent>
            </div>
            <textarea :disabled="submitting" ref="textarea" v-model="content" :placeholder="chosenSplash"
                class="resize-none min-h-48 prose prose-invert max-h-[70dvh] w-full p-0 focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 bg-transparent appearance-none focus:!border-none focus:!outline-none disabled:cursor-not-allowed"></textarea>
            <div
                :class="['absolute bottom-0 right-0 p-2 text-gray-400 font-semibold text-xs', remainingCharacters < 0 && 'text-red-500']">
                {{ remainingCharacters }}
            </div>
            <ComposerEmojiSuggestbox :currently-typing-emoji="currentlyBeingTypedEmoji"
                @autocomplete="autocompleteEmoji" />
        </div>
        <!-- Content warning textbox -->
        <div v-if="cw" class="mb-4">
            <input type="text" v-model="cwContent" placeholder="Add a content warning"
                class="w-full p-2 mt-1 text-sm prose prose-invert bg-dark-900 rounded focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 appearance-none focus:!border-none focus:!outline-none" />
        </div>
        <div class="flex flex-row gap-1 border-white/20">
            <ComposerButton title="Mention someone">
                <iconify-icon height="1.5rem" width="1.5rem" icon="tabler:at" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Toggle Markdown" @click="markdown = !markdown" :toggled="markdown">
                <iconify-icon width="1.25rem" height="1.25rem"
                    :icon="markdown ? 'tabler:markdown' : 'tabler:markdown-off'" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Use a custom emoji">
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:mood-smile" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add media">
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:photo-up" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add a file">
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:file-upload" aria-hidden="true" />
            </ComposerButton>
            <ComposerButton title="Add content warning" @click="cw = !cw" :toggled="cw">
                <iconify-icon width="1.25rem" height="1.25rem" icon="tabler:rating-18-plus" aria-hidden="true" />
            </ComposerButton>
            <ButtonsPrimary :loading="submitting" @click="send" class="ml-auto rounded-full">
                <span>Send!</span>
            </ButtonsPrimary>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { char, createRegExp, exactly } from "magic-regexp";
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
const cw = ref(false);
const cwContent = ref("");
const markdown = ref(true);

const splashes = useConfig().COMPOSER_SPLASHES;
const chosenSplash = ref(splashes[Math.floor(Math.random() * splashes.length)]);
const currentlyBeingTypedEmoji = computed(() => {
    const match = content.value?.match(partiallyTypedEmojiValidator);
    return match ? match.at(-1)?.replace(":", "") ?? "" : null;
});

const autocompleteEmoji = (emoji: string) => {
    // Replace the end of the string with the emoji
    content.value = content.value?.replace(
        createRegExp(
            exactly(":"),
            exactly(currentlyBeingTypedEmoji.value ?? "").notBefore(char),
        ),
        `:${emoji}:`,
    );
};

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
            spoiler_text: cw.value ? cwContent.value.trim() : undefined,
            sensitive: cw.value,
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