<template>
    <Collapsible as-child>
        <Base :pref="pref">
        <template #default>
            <CollapsibleTrigger as-child>
                <Button variant="outline">
                    Open code
                </Button>
            </CollapsibleTrigger>
        </template>
        <template #extra="{ setValue, value }">
            <CollapsibleContent class="col-span-2 mt-2">
                <Textarea :rows="10" :model-value="value" @update:model-value="setValue" />
            </CollapsibleContent>
        </template>
        </Base>
    </Collapsible>
</template>

<script lang="ts" setup>
import { Button } from "~/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Textarea } from "~/components/ui/textarea";
import type { CodePreference } from "../types";
import Base from "./base.vue";

const { pref } = defineProps<{
    pref: CodePreference;
}>();
</script>
