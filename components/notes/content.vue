<template>
    <Alert variant="warning" v-if="(sensitive || contentWarning) && showCw.value"
        class="mb-4 py-2 px-4 grid grid-cols-[auto,1fr,auto] gap-2 items-center [&>svg~*]:pl-0 [&>svg+div]:translate-y-0 [&>svg]:static">
        <AlertTitle class="sr-only">{{ m.livid_tangy_lionfish_clasp() }}</AlertTitle>
        <div>
            <TriangleAlert class="size-4" />
        </div>
        <AlertDescription>
            {{ contentWarning || m.sour_seemly_bird_hike() }}
        </AlertDescription>
        <Button @click="blurred = !blurred" variant="outline" size="sm">{{ blurred ? m.bald_direct_turtle_win() : m.known_flaky_cockroach_dash() }}</Button>
    </Alert>

    <div ref="container" :class="cn('overflow-y-hidden relative duration-200', (blurred && showCw.value) && 'blur-md')" :style="{
        maxHeight: collapsed ? '18rem' : `${container?.scrollHeight}px`,
    }">
        <div :class="[
            'prose prose-sm block relative dark:prose-invert duration-200 !max-w-full break-words prose-a:no-underline hover:prose-a:underline',
            $style.content,
        ]" v-html="content" v-render-emojis="emojis"></div>
        <div v-if="isOverflowing && collapsed"
            class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/5 to-transparent rounded-b"></div>
        <Button v-if="isOverflowing" @click="collapsed = !collapsed"
            class="absolute bottom-2 right-1/2 translate-x-1/2">{{
                collapsed
                    ? `${m.lazy_honest_mammoth_bump()}${plainContent ? ` • ${m.dark_spare_goldfish_charm({
                        count: formattedCharacterCount ?? '0',
                    })}` : ""                    }`
                    : m.that_misty_mule_arrive()
            }}</Button>
    </div>

    <Attachments v-if="attachments.length > 0" :attachments="attachments" :class="(blurred && showCw.value) && 'blur-xl'" />

    <div v-if="quote" class="mt-4 rounded border overflow-hidden">
        <Note :note="quote" :hide-actions="true" :small-layout="true" />
    </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { Attachment, Emoji, Status } from "@versia/client/types";
import { TriangleAlert } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import * as m from "~/paraglide/messages.js";
import { getLocale } from "~/paraglide/runtime";
import { type BooleanSetting, SettingIds } from "~/settings";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Attachments from "./attachments.vue";
import Note from "./note.vue";

const { content, plainContent, sensitive, contentWarning } = defineProps<{
    plainContent?: string;
    content: string;
    quote?: NonNullable<Status["quote"]>;
    emojis: Emoji[];
    attachments: Attachment[];
    sensitive: boolean;
    contentWarning?: string;
}>();
const container = ref<HTMLDivElement | null>(null);
const collapsed = ref(true);
const blurred = ref(sensitive || !!contentWarning);
const showCw = useSetting(SettingIds.ShowContentWarning) as Ref<BooleanSetting>;

// max-h-72 is 18rem
const remToPx = (rem: number) =>
    rem *
    Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize || "16px",
    );
const isOverflowing = computed(() => {
    if (!container.value) {
        return false;
    }
    return container.value.scrollHeight > remToPx(18);
});

const characterCount = plainContent?.length;
const formattedCharacterCount = characterCount
    ? new Intl.NumberFormat(getLocale()).format(characterCount)
    : undefined;
</script>

<style module>
@import url("~/styles/content.css");
</style>
