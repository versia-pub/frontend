<template>
    <div
        class="fixed md:hidden bottom-0 inset-x-0 border-t h-16 bg-background z-10 flex items-center justify-around *:h-full *:w-full gap-6 px-4 py-2 [&>a>svg]:size-5 [&>button>svg]:size-5"
    >
        <Button :as="NuxtLink" href="/" variant="ghost" size="icon">
            <Home />
        </Button>
        <Button
            :as="NuxtLink"
            href="/notifications"
            variant="ghost"
            size="icon"
        >
            <Bell />
        </Button>
        <Button variant="ghost" size="icon">
            <User />
        </Button>
        <Button
            variant="default"
            size="icon"
            :title="m.salty_aloof_turkey_nudge()"
            @click="useEvent('composer:open')"
        >
            <Pen />
        </Button>
    </div>
</template>

<script lang="ts" setup>
import { Bell, Home, Pen, User } from "lucide-vue-next";
import { NuxtLink } from "#components";
import * as m from "~/paraglide/messages.js";
import { Button } from "../ui/button";
</script>
