<template>
    <Input v-model:model-value="contentWarning" placeholder="Put your content warning here" />
</template>

<script lang="ts" setup>
import { Input } from "../ui/input";

const contentWarning = defineModel<string>();
</script>
