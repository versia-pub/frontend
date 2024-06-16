<template>
    <InputsText @input="e => content = (e.target as HTMLInputElement).value" v-bind="$attrs, $props" v-model="content"
        :type="showPassword ? 'text' : 'password'" :spellcheck="false" />
    <Progress.Root class="flex flex-row items-center gap-x-2" v-if="showStrength">
        <Progress.Label class="text-xs text-gray-300 font-semibold w-12">
            {{ text }}
        </Progress.Label>
        <Progress.Track class="rounded-sm w-full h-2 duration-300" :style="{
        backgroundColor: color,
    }">
            <Progress.Range />
        </Progress.Track>
    </Progress.Root>
    <Teleport :to="`#${$attrs.id}-label-slot`" v-if="teleport">
        <button type="button" @click="showPassword = !showPassword"
            class="text-xs ml-auto block mt-2 font-semibold text-gray-400">
            <iconify-icon icon="tabler:eye" class="size-4 align-text-top" height="none" />
            {{ showPassword ? "Hide password" : "Show password" }}
        </button>
    </Teleport>
</template>

<script lang="ts" setup>
import { Progress } from "@ark-ui/vue";
import { passwordStrength } from "~/utils/passwords";
const showPassword = ref(false);
const content = ref("");

import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
    isInvalid?: boolean;
    showStrength?: boolean;
}

defineOptions({
    inheritAttrs: false,
});
defineProps<Props>();

const teleport = ref(false);
const strength = computed(() => passwordStrength(content.value ?? ""));
const text = computed(() => {
    if (strength.value < 6) {
        return "Weak";
    }
    if (strength.value < 7) {
        return "Fair";
    }
    if (strength.value < 11) {
        return "Good";
    }
    return "Strong";
});
const color = computed(() => {
    if (strength.value < 6) {
        return "red";
    }
    if (strength.value < 7) {
        return "pink";
    }
    if (strength.value < 11) {
        return "yellow";
    }
    return "green";
});

onMounted(() => {
    teleport.value = true;
});
</script>