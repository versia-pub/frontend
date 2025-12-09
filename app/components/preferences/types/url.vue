<template>
    <Collapsible as-child>
        <TypeBase :pref="pref" :name="name">
            <template #default>
                <CollapsibleTrigger as-child>
                    <Button variant="outline">Edit URL</Button>
                </CollapsibleTrigger>
            </template>
            <template #extra="{ setValue, value }">
                <CollapsibleContent class="col-span-2 mt-2">
                    <UrlInput
                        placeholder="Type URL or domain here..."
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
import { Input, UrlInput } from "~/components/ui/input";
import type { preferences as prefs } from "../preferences";
import type { TextPreference } from "../types";
import TypeBase from "./type-base.vue";

const { pref, name } = defineProps<{
    pref: TextPreference;
    name: keyof typeof prefs;
}>();
</script>
