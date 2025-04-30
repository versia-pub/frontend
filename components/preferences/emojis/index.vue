<template>
     <div v-if="emojis.length > 0" class="grow">
        <Table :emojis="emojis" :can-upload="canUpload" />
     </div>
</template>

<script lang="ts" setup>
import { type Emoji, RolePermission } from "@versia/client/types";
import * as m from "~/paraglide/messages.js";
import Table from "./table.vue";

const permissions = usePermissions();
const canUpload = computed(
    () =>
        permissions.value.includes(RolePermission.ManageOwnEmojis) ||
        permissions.value.includes(RolePermission.ManageEmojis),
);

const emojis = computed(
    () =>
        identity.value?.emojis?.filter((emoji) =>
            emoji.shortcode.toLowerCase().includes(search.value.toLowerCase()),
        ) ?? [],
);

const search = ref("");

/**
 * Sort emojis by category
 */
const categories = computed(() => {
    const categories = new Map<string, Emoji[]>();
    for (const emoji of emojis.value) {
        if (!emoji.category) {
            if (!categories.has(m.lucky_ago_rat_pinch())) {
                categories.set(m.lucky_ago_rat_pinch(), []);
            }

            categories.get(m.lucky_ago_rat_pinch())?.push(emoji);
            continue;
        }

        if (!categories.has(emoji.category)) {
            categories.set(emoji.category, []);
        }

        categories.get(emoji.category)?.push(emoji);
    }
    return categories;
});
</script>
