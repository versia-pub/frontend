<template>
    <Collapsible :default-open="true">
        <div class="grid grid-cols-[1fr_auto] gap-4 items-baseline">
            <h2 class="text-2xl font-semibold tracking-tight">
                {{ name }}
            </h2>
            <CollapsibleTrigger :as-child="true">
                <Button size="icon" variant="outline" class="[&_svg]:data-[state=open]:-rotate-180">
                    <ChevronDown class="duration-200" />
                </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-3 mt-4">
            <Emoji v-for="emoji in emojis" :key="emoji.id" :emoji="emoji" />
        </CollapsibleContent>
    </Collapsible>
</template>

<script lang="ts" setup>
import type { Emoji as EmojiType } from "@versia/client/types";
import { ChevronDown } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import Emoji from "./emoji.vue";

defineProps<{
    emojis: EmojiType[];
    name: string;
}>();
</script>
