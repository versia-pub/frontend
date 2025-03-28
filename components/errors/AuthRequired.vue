<template>
    <Alert class="grid grid-cols-[1fr_auto]">
        <LogIn class="size-4" />
        <AlertTitle>{{ m.sunny_quick_lionfish_flip() }}</AlertTitle>
        <AlertDescription class="col-start-1">
            {{ m.brave_known_pelican_drip() }}
        </AlertDescription>
        <!-- Add pl-4 because Alert is adding additional padding, which we don't want -->
        <Button
            variant="secondary"
            class="w-full col-start-2 row-start-1 row-span-2 !pl-4"
            @click="signInAction"
        >
            {{ m.fuzzy_sea_moth_absorb() }}
        </Button>
    </Alert>
</template>

<script lang="ts" setup>
import { LogIn } from "lucide-vue-next";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import * as m from "~/paraglide/messages.js";

const appData = useAppData();
const signInAction = async () => signIn(appData, await askForInstance());
</script>

<style></style>
