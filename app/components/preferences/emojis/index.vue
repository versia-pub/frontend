<template>
     <div v-if="emojis.length > 0" class="grow">
        <Table :emojis="emojis" :can-upload="canUpload" />
     </div>
</template>

<script lang="ts" setup>
import { RolePermission } from "@versia/client/schemas";
import Table from "./table.vue";

const permissions = usePermissions();
const canUpload = computed(
    () =>
        permissions.value.includes(RolePermission.ManageOwnEmojis) ||
        permissions.value.includes(RolePermission.ManageEmojis),
);

const emojis = computed(() => identity.value?.emojis ?? []);
</script>
