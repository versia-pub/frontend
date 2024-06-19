<template>
    <ComposerSuggestbox class="max-h-40 overflow-auto !w-auto !flex-row">
        <div v-for="(user, index) in topUsers" :key="user.username" @click="emit('autocomplete', user.acct)"
            :ref="el => { if (el) userRefs[index] = el as Element }" :title="user.acct"
            :class="['flex', 'justify-center', 'shrink-0', 'items-center', 'p-2', 'size-12', 'hover:bg-dark-900/70', { 'bg-primary-500': index === selectedUserIndex }]">
            <img :src="user.avatar" class="w-full h-full object-contain" :alt="`User ${user.acct}`" />
        </div>
    </ComposerSuggestbox>
</template>

<script lang="ts" setup>
import type { Account } from "@lysand-org/client/types";
import { distance } from "fastest-levenshtein";
const props = defineProps<{
    currentlyTypingMention: string | null;
    textarea: HTMLTextAreaElement | undefined;
}>();

const userRefs = ref<Element[]>([]);
const { Tab, ArrowRight, ArrowLeft, Enter } = useMagicKeys({
    target: props.textarea,
    passive: false,
    onEventFired(e) {
        if (
            ["Tab", "Enter", "ArrowRight", "ArrowLeft"].includes(e.key) &&
            topUsers.value !== null
        )
            e.preventDefault();
    },
});
const topUsers = ref<Account[] | null>(null);
const selectedUserIndex = ref<number | null>(null);
const client = useClient();

watch(
    [ArrowRight, ArrowLeft, Tab, Enter, () => props.currentlyTypingMention],
    async () => {
        if (props.currentlyTypingMention !== null) {
            const users = await client.value.searchAccount(
                props.currentlyTypingMention,
                { limit: 20 },
            );
            topUsers.value = users.data
                .map((user) => ({
                    ...user,
                    distance: distance(
                        props.currentlyTypingMention as string,
                        user.username,
                    ),
                }))
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 20);
        } else {
            topUsers.value = null;
        }

        if (ArrowRight?.value && topUsers.value !== null) {
            selectedUserIndex.value = (selectedUserIndex.value ?? -1) + 1;
            if (selectedUserIndex.value >= topUsers.value.length) {
                selectedUserIndex.value = 0;
            }
            userRefs.value[selectedUserIndex.value]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }

        if (ArrowLeft?.value && topUsers.value !== null) {
            selectedUserIndex.value =
                (selectedUserIndex.value ?? topUsers.value.length) - 1;
            if (selectedUserIndex.value < 0) {
                selectedUserIndex.value = topUsers.value.length - 1;
            }
            userRefs.value[selectedUserIndex.value]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }

        if ((Tab?.value || Enter?.value) && topUsers.value !== null) {
            const user = topUsers.value[selectedUserIndex.value ?? 0];
            if (user) emit("autocomplete", user.username);
        }
    },
);

// When currentlyTypingMention changes, reset the selected user index
watch(
    () => props.currentlyTypingMention,
    () => {
        selectedUserIndex.value = null;
    },
);

const emit = defineEmits<{
    autocomplete: [username: string];
}>();
</script>