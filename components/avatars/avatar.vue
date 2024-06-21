<template>
    <div v-bind="$attrs" class="bg-dark-700 overflow-hidden flex items-center justify-center">
        <Skeleton :enabled="!imageLoaded" class="!h-full !w-full !rounded-none">
            <img class="cursor-pointer ring-1 w-full h-full object-cover" :src="src" :alt="alt" />
        </Skeleton>
    </div>
</template>

<script lang="ts" setup>
import Skeleton from "../skeleton/Skeleton.vue";

defineOptions({
    inheritAttrs: false,
});
const props = defineProps<{
    src?: string;
    alt?: string;
}>();
const imageLoaded = ref(false);

watch(
    () => props.src,
    (src) => {
        if (!src) {
            return;
        }

        // Load in background
        const img = new Image();
        img.src = src;

        img.onload = () => {
            imageLoaded.value = true;
        };
    },
    { immediate: true },
);
</script>