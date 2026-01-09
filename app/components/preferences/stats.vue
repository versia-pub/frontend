<template>
    <Card class="grid gap-3 text-sm max-w-sm">
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
import pkg from "~~/package.json";
import { Card } from "../ui/card";

const data: [string, string | VNode][] = [
    ["Version", pkg.version],
    ["Licence", pkg.license],
    ["Author", pkg.author.name],
    [
        "Repository",
        <a
            href={pkg.repository.url.replace("git+", "")}
            target="_blank"
            rel="noopener noreferrer"
        >
            {pkg.repository.url.replace("git+", "").replace("https://", "")}
        </a>,
    ],
];
</script>
