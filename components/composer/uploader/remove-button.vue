<template>
    <button class="absolute top-1 right-1 p-1 bg-dark-800 text-white text-xs rounded size-6" role="button" tabindex="0"
        @pointerup="$emit('remove')" @keydown.enter="$emit('remove')">
        <iconify-icon icon="tabler:x" width="none" class="size-4" />
    </button>
</template>

<script lang="ts" setup>
defineEmits<{
    remove: [];
}>();
</script>