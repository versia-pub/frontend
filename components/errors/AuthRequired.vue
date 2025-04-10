<template>
    <Alert layout="button" class="grid">
        <LogIn />
        <AlertTitle>{{ m.sunny_quick_lionfish_flip() }}</AlertTitle>
        <AlertDescription>
            {{ m.brave_known_pelican_drip() }}
        </AlertDescription>
        <Button
            variant="secondary"
            class="w-full"
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
