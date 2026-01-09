<template>
    <div class="flex flex-col gap-1">
        <p class="text-sm leading-6 wrap-anywhere">
            {{ contentWarning || m.sour_seemly_bird_hike() }}
        </p>
        <Button
            @click="hidden = !hidden"
            variant="outline"
            size="sm"
            class="col-span-2"
        >
            {{ hidden ? m.bald_direct_turtle_win() :
                m.known_flaky_cockroach_dash() }}
            {{ characterCount > 0 ? ` (${characterCount} characters` : "" }}
            {{ attachmentCount > 0 ? `${characterCount > 0 ? " · " : " ("}${attachmentCount} file(s)` : "" }}
            {{ (characterCount > 0 || attachmentCount > 0) ? ")" : "" }}
        </Button>
    </div>
</template>

<script lang="ts" setup>
import * as m from "~~/paraglide/messages.js";
import { Button } from "../ui/button";

const { contentWarning, characterCount, attachmentCount } = defineProps<{
    contentWarning?: string;
    characterCount: number;
    attachmentCount: number;
}>();

const hidden = defineModel<boolean>({
    default: true,
});
</script>
