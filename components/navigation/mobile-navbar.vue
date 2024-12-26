<template>
    <div
        class="fixed md:hidden bottom-0 inset-x-0 border-t h-20 bg-background z-10 flex items-center justify-around *:h-full *:w-full gap-6 px-4 py-2">
        <Button :as="NuxtLink" href="/" variant="ghost" size="icon">
            <Home class="!size-6" />
        </Button>
        <Button :as="NuxtLink" href="/notifications" variant="ghost" size="icon">
            <Bell class="!size-6" />
        </Button>
        <AccountSwitcher>
            <Button variant="ghost" size="icon">
                <User class="!size-6" />
            </Button>
        </AccountSwitcher>
        <Button variant="default" size="icon" :title="m.salty_aloof_turkey_nudge()"
            @click="useEvent('composer:open')">
            <Pen class="!size-6" />
        </Button>
    </div>
</template>

<script lang="ts" setup>
import { Bell, Home, Pen, User } from "lucide-vue-next";
import * as m from "~/paraglide/messages.js";
import { NuxtLink } from "#components";
import AccountSwitcher from "../sidebars/account-switcher.vue";
import { Button } from "../ui/button";
</script>
