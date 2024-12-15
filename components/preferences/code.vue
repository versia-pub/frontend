<template>
    <Collapsible :as="Card" class="grid items-center p-6 gap-4" v-slot="{ open }">
        <div class="grid grid-cols-[1fr,auto] items-center gap-4">
            <CardHeader class="space-y-0.5 p-0">
                <CardTitle class="text-base">
                    {{ setting.title() }}
                </CardTitle>
                <CardDescription>
                    {{ setting.description() }}
                </CardDescription>
            </CardHeader>
            <CollapsibleTrigger :as-child="true">
                <Button variant="outline" size="icon" class="ml-auto [&_svg]:data-[state=open]:-rotate-180"
                    :title="open ? 'Collapse' : 'Expand'">
                    <ChevronDown class="duration-200" />
                </Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent :as-child="true">
            <CardFooter class="p-1">
                <Textarea :rows="10" :model-value="setting.value"
                    @update:model-value="v => { setting.value = String(v) }" />
            </CardFooter>
        </CollapsibleContent>
    </Collapsible>
</template>

<script lang="ts" setup>
import { ChevronDown } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Textarea } from "~/components/ui/textarea";
import type { CodeSetting } from "~/settings.ts";

defineModel<CodeSetting>("setting", {
    required: true,
});
</script>