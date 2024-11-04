<template>
    <div v-if="cw" class="mb-4">
        <input type="text" v-model="cwContent" placeholder="Add a content warning"
            class="w-full p-2 mt-1 text-sm prose prose-invert bg-dark-900 rounded focus:!ring-0 !ring-none !border-none !outline-none placeholder:text-zinc-500 appearance-none focus:!border-none focus:!outline-none"
            aria-label="Content warning" />
    </div>
</template>

<script lang="ts" setup>
const cw = defineModel<boolean>("cw", {
    required: true,
});
const cwContent = defineModel<string>("cwContent", {
    required: true,
});
</script>