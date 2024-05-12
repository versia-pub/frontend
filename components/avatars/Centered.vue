<template>
    <div v-bind="$props" class="bg-dark-700 overflow-hidden flex items-center justify-center">
        <Skeleton :enabled="!url" class="!h-full !w-full">
            <img class="cursor-pointer bg-dark-700 ring-1 w-full h-full object-cover" :src="url" :alt="alt"
                :title="alt" />
        </Skeleton>
    </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ HTMLAttributes {
    url?: string;
    alt?: string;
}

defineProps<Props>();
</script>