<template>
    <Card class="grid gap-3 text-sm p-4">
        <dl class="grid gap-3">
            <div v-for="[key, value] of data" :key="key" class="flex flex-row items-baseline justify-between gap-4 truncate">
                <dt class="text-muted-foreground">
                    {{ key }}
                </dt>
                <dd class="font-mono" v-if="typeof value === 'string'">{{ value }}</dd>
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

const appData = useAppData();

const data: [string, string | VNode][] = [
    ["User ID", identity.value?.account.id ?? ""],
    ["Instance domain", identity.value?.instance.domain ?? ""],
    ["Instance version", identity.value?.instance.versia_version ?? ""],
    ["Client ID", appData.value?.client_id ?? ""],
    [
        "Client secret",
        <Button
            variant="outline"
            class="font-sans"
            size="sm"
            // @ts-expect-error missing onClick types
            onClick={() => copy(appData.value?.client_secret ?? "")}
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
            onClick={() => copy(identity.value?.tokens.access_token ?? "")}
        >
            Click to copy
        </Button>,
    ],
];
</script>
