<template>
    <FormItem>
        <FormLabel>
            {{ title }}
            <Button
                type="button"
                variant="secondary"
                size="icon"
                class="ml-auto"
                @click="addField()"
                :title="m.front_north_eel_gulp()"
            >
                <Plus />
            </Button>
        </FormLabel>

        <FormControl>
            <VueDraggable
                class="grid gap-4"
                v-model="list"
                :animation="200"
                handle=".drag-handle"
            >
                <div
                    v-for="(field, index) in list"
                    :key="field.id"
                    class="grid items-center grid-cols-[auto_repeat(3,minmax(0,1fr))_auto] gap-2"
                >
                    <Button
                        as="span"
                        variant="ghost"
                        size="icon"
                        class="drag-handle cursor-grab"
                    >
                        <GripVertical />
                    </Button>
                    <Input
                        :model-value="field.name"
                        placeholder="Name"
                        @update:model-value="
                        (e) =>  updateKey(index, String(e))
                    "
                    />
                    <Input
                        :model-value="field.value"
                        placeholder="Value"
                        class="col-span-2"
                        @update:model-value="
                        (e) => updateValue(index, String(e))
                    "
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        @click="removeField(index)"
                    >
                        <Trash />
                    </Button>
                </div>
            </VueDraggable>
            <FormMessage />
        </FormControl>
    </FormItem>
</template>

<script lang="ts" setup>
import { GripVertical, Plus, Trash } from "lucide-vue-next";
import { VueDraggable } from "vue-draggable-plus";
import { Button } from "~/components/ui/button";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import * as m from "~~/paraglide/messages.js";

const { title } = defineProps<{
    title: string;
}>();

const value = defineModel<{ name: string; value: string }[]>("value", {
    default: [],
});

const list = ref<
    {
        id: string;
        name: string;
        value: string;
    }[]
>(
    value.value.map((item, index) => ({
        id: String(index),
        name: item.name,
        value: item.value,
    })),
);

watch(
    list,
    (newList) => {
        value.value = newList.map((item) => ({
            name: item.name,
            value: item.value,
        }));
    },
    {
        deep: true,
    },
);

const updateKey = (index: number, key: string) => {
    if (!list.value[index]) {
        return;
    }

    list.value[index].name = key;
};

const updateValue = (index: number, val: string) => {
    if (!list.value[index]) {
        return;
    }

    list.value[index].value = val;
};

const removeField = (index: number) => {
    list.value.splice(index, 1);
};

const addField = () => {
    list.value.push({ name: "", value: "", id: String(list.value.length) });
};
</script>
