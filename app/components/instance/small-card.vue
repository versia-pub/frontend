<template>
    <Card class="grid grid-cols-[auto_1fr] gap-2">
        <Avatar :src="instance.thumbnail?.url ??
            'https://cdn.versia.pub/branding/icon.svg'
            " :name="instance.title" />
        <div class="grid text-sm leading-tight *:line-clamp-1">
            <span class="truncate font-semibold">
                {{
                    instance.domain
                }}
            </span>
            <span class="line-clamp-3 text-xs">
                {{
                    instance.versia_version || instance.version
                }}
            </span>

        </div>
        <h1 class="line-clamp-1 text-sm font-semibold col-span-2">
            {{
                instance.title
            }}
        </h1>
        <p class="line-clamp-5 text-xs col-span-2">
            {{
                instance.description
            }}
        </p>
    </Card>
</template>

<script lang="ts" setup>
import type { Instance } from "@versia/client/schemas";
import type z from "zod";
import Avatar from "../profiles/avatar.vue";
import { Card } from "../ui/card";

const { instance } = defineProps<{
    instance: z.infer<typeof Instance>;
}>();
</script>
