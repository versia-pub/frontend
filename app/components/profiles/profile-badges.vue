<template>
    <Row class="gap-2" wrap
        v-if="isDeveloper || account.bot || roles.length > 0"
    >
        <ProfileBadge
            v-if="isDeveloper"
            :name="m.nice_bad_grizzly_coax()"
            :description="m.honest_jolly_shell_blend()"
            :verified="true"
        />
        <ProfileBadge
            v-if="account.bot"
            :name="m.merry_red_shrimp_bump()"
            :description="m.sweet_mad_jannes_create()"
        />
        <ProfileBadge
            v-for="role in roles"
            :key="role.id"
            :name="role.name"
            :description="role.description"
            :icon="role.icon"
        />
    </Row>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/schemas";
import type { z } from "zod";
import * as m from "~~/paraglide/messages.js";
import Row from "../typography/layout/row.vue";
import ProfileBadge from "./profile-badge.vue";

const { account } = defineProps<{
    account: z.infer<typeof Account>;
}>();
const authStore = useAuthStore();

const config = useConfig();
const roles = account.roles.filter((r) => r.visible);
// Get user handle in username@instance format
const handle = account.acct.includes("@")
    ? account.acct
    : `${account.acct}@${authStore.instance?.domain ?? window.location.host}`;
const isDeveloper = config.DEVELOPER_HANDLES.includes(handle);
</script>

<style></style>
