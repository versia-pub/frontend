<template>
     <div v-if="authStore.emojis.length > 0" class="grow">
        <Table :emojis="authStore.emojis" :can-upload="canUpload" />
     </div>
</template>

<script lang="ts" setup>
import { RolePermission } from "@versia/client/schemas";
import Table from "./table.vue";

const authStore = useAuthStore();
const canUpload = computed(
    () =>
        authStore.permissions.includes(RolePermission.ManageOwnEmojis) ||
        authStore.permissions.includes(RolePermission.ManageEmojis),
);
</script>
