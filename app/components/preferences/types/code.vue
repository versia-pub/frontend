<template>
    <Collapsible as-child>
        <TypeBase :name="name" :pref="pref">
            <template #default>
                <CollapsibleTrigger as-child>
                    <Button variant="outline">Open code</Button>
                </CollapsibleTrigger>
            </template>
            <template #extra="{ setValue, value }">
                <CollapsibleContent class="col-span-2 mt-2">
                    <Textarea
                        :rows="10"
                        :model-value="value"
                        @update:model-value="setValue"
                    />
                </CollapsibleContent>
            </template>
        </TypeBase>
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
import type { preferences as prefs } from "../preferences";
import type { CodePreference } from "../types";
import TypeBase from "./type-base.vue";

const { pref, name } = defineProps<{
    pref: CodePreference;
    name: keyof typeof prefs;
}>();
</script>
