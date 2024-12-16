<template>
    <div
        class="fixed md:hidden bottom-0 inset-x-0 border-t h-20 bg-background z-10 flex items-center justify-around *:p-7 *:w-full gap-6 p-6">
        <Timelines>
            <Button variant="ghost" size="icon">
                <Home class="!size-6" />
            </Button>
        </Timelines>
        <Button v-if="identity" :as="NuxtLink" href="/notifications" variant="ghost" size="icon">
            <Bell class="!size-6" />
        </Button>
        <AccountSwitcher>
            <Button variant="ghost" size="icon">
                <User class="!size-6" />
            </Button>
        </AccountSwitcher>
        <Button v-if="identity" variant="default" size="icon" :title="m.salty_aloof_turkey_nudge()"
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
import Timelines from "./timelines.vue";
</script>