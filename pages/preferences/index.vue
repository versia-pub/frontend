<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
import * as m from "~/paraglide/messages.js";

definePageMeta({
    layout: "app",
    breadcrumbs: () => [
        {
            text: m.broad_whole_herring_reside(),
        },
    ],
    requiresAuth: true,
});
</script>