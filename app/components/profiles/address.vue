<template>
    <Text class="font-semibold text-sm tracking-tight">
        <span class="text-accent-foreground">@{{ username }}</span>
        <span v-if="domain" class="text-muted-foreground">@{{ domain }}</span>
    </Text>
</template>

<script lang="ts" setup>
import Text from "../typography/text.vue";

const { username, domain } = defineProps<{
    username?: string;
    domain?: string;
}>();
</script>
