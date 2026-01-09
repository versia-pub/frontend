<template>
    <Card class="grid gap-3 text-sm">
        <dl class="grid gap-3">
            <div
                v-for="[key, value] of data"
                :key="key"
                class="flex flex-row items-baseline justify-between gap-4 truncate"
            >
                <dt class="text-muted-foreground">{{ key }}</dt>
                <dd class="font-mono" v-if="typeof value === 'string'">
                    {{ value }}
                </dd>
                <dd class="font-mono" v-else>
                    <component :is="value" />
                </dd>
            </div>
        </dl>
    </Card>
</template>

<script lang="tsx" setup>
import type { VNode } from "vue";
import { toast } from "vue-sonner";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const copy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast.success("Copied to clipboard");
};

const authStore = useAuthStore();

const data: [string, string | VNode][] = [
    ["User ID", authStore.account.id],
    ["Instance domain", authStore.instance.domain],
    ["Instance version", authStore.instance.versia_version ?? ""],
    ["Client ID", authStore.application?.client_id ?? ""],
    [
        "Client secret",
        <Button
            variant="outline"
            class="font-sans"
            size="sm"
            // @ts-expect-error missing onClick types
            onClick={() => copy(authStore.application?.client_secret ?? "")}
        >
            Click to copy
        </Button>,
    ],
    [
        "Access token",
        <Button
            variant="outline"
            class="font-sans"
            size="sm"
            // @ts-expect-error missing onClick types
            onClick={() => copy(authStore.token.access_token)}
        >
            Click to copy
        </Button>,
    ],
];
</script>
