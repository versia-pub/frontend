<template>
    <Transition enter-active-class="transition duration-300 ease-in-out" enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-in-out"
        leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <div class="max-h-40 max-w-full rounded ring-1 ring-dark-300 bg-dark-800 fixed z-20" :style="{
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
        }" v-show="topSuggestions && topSuggestions.length > 0">
            <OverlayScrollbarsComponent class="w-full [&>div]:flex">
                <div v-for="(suggestion, index) in topSuggestions" :key="suggestion.key"
                    @click="emit('autocomplete', suggestion.key)"
                    :ref="el => { if (el) suggestionRefs[index] = el as Element }" :title="suggestion.key"
                    :class="['flex justify-center shrink-0 items-center size-12 p-2 hover:bg-dark-900/70', index === selectedSuggestionIndex && 'bg-primary-500']">
                    <slot :suggestion="suggestion"></slot>
                </div>
            </OverlayScrollbarsComponent>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "#imports";

const props = defineProps<{
    currentlyTyping: string | null;
    textarea: HTMLTextAreaElement | undefined;
    suggestions: Array<{ key: string; value: unknown }>;
    distanceFunction: (a: string, b: string) => number;
}>();

const suggestionRefs = ref<Element[]>([]);
// Allow the user to navigate the suggestions with the arrow keys
// and select a suggestion with the Tab or Enter key
const { Tab, ArrowRight, ArrowLeft, Enter } = useMagicKeys({
    target: props.textarea,
    passive: false,
    onEventFired(e) {
        if (
            ["Tab", "Enter", "ArrowRight", "ArrowLeft"].includes(e.key) &&
            topSuggestions.value !== null
        ) {
            e.preventDefault();
        }
    },
});
const topSuggestions = ref<Array<{ key: string; value: unknown }> | null>(null);
const selectedSuggestionIndex = ref<number | null>(null);

const x = ref(0);
const y = ref(0);
const width = ref(0);
const TOP_PADDING = 10;

useEventListener(props.textarea, "keyup", () => {
    recalculatePosition();
});

const recalculatePosition = () => {
    if (props.textarea) {
        const target = props.textarea;
        const position = target.selectionEnd;
        // Get x, y position of the cursor in the textarea
        const { top, left } = target.getBoundingClientRect();
        const lineHeight = Number.parseInt(
            getComputedStyle(target).lineHeight ?? "0",
            10,
        );
        const lines = target.value.slice(0, position).split("\n");
        const line = lines.length - 1;
        x.value = left;
        // Spawn one line below the cursor, so add +1
        y.value = top + (line + 1) * lineHeight + TOP_PADDING;
        width.value = target.clientWidth;
    }
};

watchEffect(() => {
    if (props.currentlyTyping !== null) {
        topSuggestions.value = props.suggestions
            .map((suggestion) => ({
                ...suggestion,
                distance: props.distanceFunction(
                    props.currentlyTyping as string,
                    suggestion.key,
                ),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 20);
    } else {
        topSuggestions.value = null;
    }

    if (ArrowRight?.value && topSuggestions.value !== null) {
        selectedSuggestionIndex.value =
            (selectedSuggestionIndex.value ?? -1) + 1;
        if (selectedSuggestionIndex.value >= topSuggestions.value.length) {
            selectedSuggestionIndex.value = 0;
        }
        suggestionRefs.value[selectedSuggestionIndex.value]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }

    if (ArrowLeft?.value && topSuggestions.value !== null) {
        selectedSuggestionIndex.value =
            (selectedSuggestionIndex.value ?? topSuggestions.value.length) - 1;
        if (selectedSuggestionIndex.value < 0) {
            selectedSuggestionIndex.value = topSuggestions.value.length - 1;
        }
        suggestionRefs.value[selectedSuggestionIndex.value]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }

    if ((Tab?.value || Enter?.value) && topSuggestions.value !== null) {
        const suggestion =
            topSuggestions.value[selectedSuggestionIndex.value ?? 0];
        if (suggestion) {
            emit("autocomplete", suggestion.key);
        }
    }
});

const emit = defineEmits<{
    autocomplete: [suggestion: string];
}>();
</script>