<template>
<Textarea :placeholder="chosenSplash" class="!border-none !ring-0 !outline-none rounded-none p-0 max-h-full min-h-48 !ring-offset-0" />

<DialogFooter class="items-center flex-row">
    <Button variant="ghost" size="icon">
        <AtSign class="!size-5" />
    </Button>
    <Button variant="ghost" size="icon">
        <LetterText class="!size-5" />
    </Button>
    <Button variant="ghost" size="icon">
        <Smile class="!size-5" />
    </Button>
    <Button variant="ghost" size="icon">
        <FilePlus2 class="!size-5" />
    </Button>
    <Button variant="ghost" size="icon">
        <TriangleAlert class="!size-5" />
    </Button>
    <Button type="submit" size="lg" class="ml-auto">
        {{  relation?.type === "edit" ? "Save" : "Send" }}
    </Button>
</DialogFooter>
</template>

<script lang="ts" setup>
import type { Status } from "@versia/client/types";
import {
    AtSign,
    FilePlus2,
    LetterText,
    Smile,
    TriangleAlert,
} from "lucide-vue-next";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

defineProps<{
    relation?: {
        type: "reply" | "reblog" | "edit";
        note: Status;
    };
}>();

const splashes = useConfig().COMPOSER_SPLASHES;
const chosenSplash = splashes[Math.floor(Math.random() * splashes.length)];
</script>