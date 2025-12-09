<template>
    <Select v-model:model-value="visibility">
        <SelectTrigger as-child disable-default-classes disable-select-icon>
            <slot/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem
                v-for="(v, k) in visibilities"
                :key="k"
                @click="visibility = k"
                :value="k"
            >
                <div
                    class="flex flex-row gap-3 items-center w-full justify-between"
                >
                    <component :is="v.icon" class="size-4"/>
                    <div class="flex flex-col gap-1">
                        <span class="font-semibold">{{ v.name }}</span>
                        <span>{{ v.text }}</span>
                    </div>
                </div>
            </SelectItem>
        </SelectContent>
    </Select>
</template>

<script lang="ts" setup>
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "~/components/ui/select";
import { visibilities } from "./visibilities";

const visibility = defineModel<ComposerState["visibility"]>("visibility", {
    required: true,
});
</script>
