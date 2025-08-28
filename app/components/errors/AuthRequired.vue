<template>
    <Alert layout="button">
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
import { toast } from "vue-sonner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import * as m from "~~/paraglide/messages.js";

const authStore = useAuthStore();
const signInAction = async () => {
    const instance = await askForInstance();

    const id = toast.loading(m.level_due_ox_greet());

    try {
        await authStore.startSignIn(instance);
    } catch (e) {
        toast.dismiss(id);
    }
};
</script>

<style></style>
