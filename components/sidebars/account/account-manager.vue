<template>
    <Dialog>
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Accounts</DialogTitle>
                <DialogDescription class="sr-only">
                    Manage your accounts and settings.
                </DialogDescription>
            </DialogHeader>
            <div v-if="identities.length > 0" class="grid gap-4 py-2">
                <div v-for="identity of identities" :key="identity.account.id"
                    class="grid grid-cols-[1fr_auto] has-[>[data-switch]]:grid-cols-[1fr_auto_auto] gap-2">
                    <TinyCard :account="identity.account" :domain="identity.instance.domain" naked />
                    <Button data-switch v-if="currentIdentity?.id !== identity.id"
                        @click="switchAccount(identity.account.id)" variant="outline">
                        Switch
                    </Button>
                    <Button @click="signOut(appData, identity)" variant="outline" size="icon"
                        :title="m.sharp_big_mallard_reap()">
                        <LogOut />
                    </Button>
                </div>
            </div>
            <div v-else>
                <p class="text-sm text-muted-foreground">
                    Log in to or register an account on your favourite instance.
                </p>
            </div>
            <DialogFooter>
                <Button :as="NuxtLink" href="/register" variant="outline">
                    <UserPlus />
                    {{ m.honest_few_baboon_pop() }}
                </Button>
                <Button @click="signInAction">
                    <LogIn />
                    {{ m.sunny_pink_hyena_walk() }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { LogIn, LogOut, UserPlus } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { NuxtLink } from "#components";
import { identity as currentIdentity } from "#imports";
import TinyCard from "~/components/profiles/tiny-card.vue";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import * as m from "~/paraglide/messages.js";

const appData = useAppData();

const signInAction = async () => signIn(appData, await askForInstance());

const switchAccount = async (userId: string) => {
    if (userId === currentIdentity.value?.account.id) {
        return await navigateTo(`/@${currentIdentity.value.account.username}`);
    }

    const id = toast.loading("Switching account...");

    const identityToSwitch = identities.value.find(
        (i) => i.account.id === userId,
    );

    if (!identityToSwitch) {
        toast.dismiss(id);
        toast.error("No identity to switch to");
        return;
    }

    currentIdentity.value = identityToSwitch;
    toast.dismiss(id);
    toast.success("Switched account");

    window.location.href = "/";
};
</script>
