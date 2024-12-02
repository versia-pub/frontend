<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <SidebarMenuButton size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar v-if="identity" shape="square" class="size-8">
                    <AvatarImage :src="identity?.account.avatar" alt="" />
                    <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
                </Avatar>
                <Avatar v-else shape="square" class="size-8">
                    <AvatarFallback class="rounded-lg"> AB </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold" v-render-emojis="identity?.account.emojis">{{
                        identity?.account.display_name ?? "Not signed in"
                    }}</span>
                    <span class="truncate text-xs" v-if="identity">@{{ identity?.account.acct }}</span>
                </div>
                <ChevronsUpDown class="ml-auto size-4" />
            </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom"
            align="end" :side-offset="4">
            <DropdownMenuLabel class="p-0 font-normal">
                <div v-for="identity of identities" class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar shape="square" class="size-8">
                        <AvatarImage :src="identity.account.avatar" alt="" />
                        <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-semibold" v-render-emojis="identity.account.emojis">{{
                            identity.account.display_name
                        }}</span>
                        <span class="truncate text-xs">@{{
                            identity.account.acct
                        }}</span>
                    </div>
                </div>
                <DropdownMenuItem @click="signIn()">
                    <UserPlus />
                    Add account
                </DropdownMenuItem>
            </DropdownMenuLabel>
            <DropdownMenuSeparator v-if="identity" />
            <DropdownMenuGroup v-if="identity">
                <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="signOut()">
                <LogOut />
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { BadgeCheck, ChevronsUpDown, LogOut, UserPlus } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";

const appData = useAppData();

const signIn = async () => {
    const id = toast.loading("Signing in...");

    const output = await client.value.createApp("Versia", {
        scopes: ["read", "write", "follow", "push"],
        redirect_uris: new URL("/", useRequestURL().origin).toString(),
        website: useBaseUrl().value,
    });

    if (!output?.data) {
        toast.dismiss(id);
        toast.error("Failed to create app");
        return;
    }

    appData.value = output.data;

    const url = await client.value.generateAuthUrl(
        output.data.client_id,
        output.data.client_secret,
        {
            scopes: ["read", "write", "follow", "push"],
            redirect_uri: new URL("/", useRequestURL().origin).toString(),
        },
    );

    if (!url) {
        toast.dismiss(id);
        toast.error("Failed to generate auth URL");
        return;
    }

    window.location.href = url;
};

const signOut = async (userId?: string) => {
    const id = toast.loading("Signing out...");

    if (!(appData.value && identity.value)) {
        toast.dismiss(id);
        toast.error("No app or identity data to sign out");
        return;
    }

    const identityToRevoke = userId
        ? identities.value.find((i) => i.account.id === userId)
        : identity.value;

    if (!identityToRevoke) {
        toast.dismiss(id);
        toast.error("No identity to revoke");
        return;
    }

    // Don't do anything on error, as Versia Server doesn't implement the revoke endpoint yet
    await client.value
        ?.revokeToken(
            appData.value.client_id,
            identityToRevoke.tokens.access_token,
            identityToRevoke.tokens.access_token,
        )
        .catch(() => {
            // Do nothing
        });

    if (!userId) {
        identity.value = null;
        await navigateTo("/");
        return;
    }

    identities.value = identities.value.filter((i) => i.id !== userId);
    toast.dismiss(id);
    toast.success("Signed out");
};
</script>