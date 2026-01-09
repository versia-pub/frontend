<template>
    <div class="flex flex-col gap-1">
        <p class="text-sm leading-6 wrap-anywhere">
            {{ note.spoiler_text || m.sour_seemly_bird_hike() }}
        </p>
        <Button
            @click="hidden = !hidden"
            variant="outline"
            size="sm"
            class="col-span-2"
        >
            {{ hidden ? m.bald_direct_turtle_win() :
                m.known_flaky_cockroach_dash() }}
            {{ constructText() }}
        </Button>
    </div>
</template>

<script lang="ts" setup>
import * as m from "~~/paraglide/messages.js";
import { Button } from "../ui/button";
import { key } from "./provider";

// biome-ignore lint/style/noNonNullAssertion: We want an error if not provided
const { note } = inject(key)!;

const attachmentCount = note.media_attachments.length;
const characterCount = note.text?.length || 0;

const hidden = defineModel<boolean>({
    default: true,
});

const constructText = () => {
    const parts: string[] = [];

    if (characterCount > 0) {
        parts.push(
            `${characterCount} character${characterCount === 1 ? "" : "s"}`,
        );
    }

    if (attachmentCount > 0) {
        parts.push(
            `${attachmentCount} file${attachmentCount === 1 ? "" : "s"}`,
        );
    }

    return parts.length > 0 ? ` (${parts.join(" · ")})` : "";
};
</script>
