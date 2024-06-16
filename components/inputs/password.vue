<template>
    <InputsText v-bind="$attrs, $props" :type="showPassword ? 'text' : 'password'" :spellcheck="false"
        autocomplete="new-password" />
    <Teleport :to="`#${$attrs.id}-label-slot`" v-if="teleport">
        <button type="button" @click="showPassword = !showPassword"
            class="text-xs ml-auto block mt-2 font-semibold text-gray-400">
            <iconify-icon icon="tabler:eye" class="size-4 align-text-top" height="none" />
            {{ showPassword ? "Hide password" : "Show password" }}
        </button>
    </Teleport>
</template>

<script lang="ts" setup>
const showPassword = ref(false);

import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
    isInvalid?: boolean;
}

defineOptions({
    inheritAttrs: false,
});
defineProps<Props>();

const teleport = ref(false);

onMounted(() => {
    teleport.value = true;
});
</script>