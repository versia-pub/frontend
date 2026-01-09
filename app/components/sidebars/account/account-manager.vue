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
            <div v-if="authStore.identities.length > 0" class="grid gap-4 py-2">
                <div
                    v-for="identity of authStore.identities"
                    :key="identity.account.id"
                    class="grid grid-cols-[1fr_auto] has-[>[data-switch]]:grid-cols-[1fr_auto_auto] gap-2"
                >
                    <TinyCard
                        :account="identity.account"
                        :domain="identity.instance.domain"
                        naked
                    />
                    <Button
                        data-switch
                        v-if="authStore.identity?.id !== identity.id"
                        @click="authStore.setActiveIdentity(identity.id)"
                        variant="outline"
                    >
                        Switch
                    </Button>
                    <Button
                        @click="signOutAction(identity.id)"
                        variant="outline"
                        size="icon"
                        :title="m.sharp_big_mallard_reap()"
                    >
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
import * as m from "~~/paraglide/messages.js";

const authStore = useAuthStore();
const signInAction = async () => {
    const instance = await askForInstance();

    const id = toast.loading(m.level_due_ox_greet());

    try {
        await authStore.startSignIn(instance);
    } catch (e) {
        console.error(e);
        toast.dismiss(id);
    }
};

const signOutAction = async (identityId: string) => {
    const id = toast.loading("Signing out...");

    await authStore.signOut(identityId);
    toast.dismiss(id);
    toast.success("Signed out");
};
</script>
