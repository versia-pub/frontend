<template>
    <div v-if="relationship?.requested_by !== false" class="flex flex-row items-center gap-3 p-4">
        <NuxtLink class="relative size-10">
            <Avatar class="size-10 rounded border border-border">
                <AvatarImage :src="follower.avatar" alt="" />
                <AvatarFallback class="rounded-lg"> AA </AvatarFallback>
            </Avatar>
        </NuxtLink>
        <div class="flex flex-col gap-0.5 justify-center flex-1 text-left leading-tight text-sm">
            <span class="truncate font-semibold">{{
                follower.display_name
                }}</span>
            <span class="truncate tracking-tight">
                <CopyableText :text="follower.acct">
                    <span
                        class="font-semibold bg-gradient-to-tr from-pink-700 dark:from-indigo-400 via-purple-700 dark:via-purple-400 to-indigo-700 dark:to-indigo-400 text-transparent bg-clip-text">
                        @{{ username }}
                    </span>
                    <span class="text-muted-foreground">{{ instance && "@" }}{{ instance }}</span>
                </CopyableText>
            </span>
        </div>
    </div>
    <div v-if="loading" class="flex p-2 items-center justify-center h-12">
        <Loader class="size-4 animate-spin" />
    </div>
    <div v-else-if="relationship?.requested_by === false" class="flex p-2 items-center justify-center h-12">
        <Check class="size-4" />
    </div>
    <div v-else class="grid grid-cols-2 p-2 gap-2">
        <Button variant="outline" size="sm" @click="accept">
            <Check />
            Accept
        </Button>
        <Button variant="ghost" size="sm" @click="reject">
            <X />
            Reject
        </Button>
    </div>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/types";
import { Check, Loader, X } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

const { follower } = defineProps<{
    follower: Account;
}>();

const loading = ref(true);
const [username, instance] = follower.acct.split("@");
const { relationship } = useRelationship(client, follower.id);

// TODO: Add "followed" notification
watch(relationship, () => {
    if (relationship.value) {
        loading.value = false;
    }
});

const accept = async () => {
    const id = toast.loading("Accepting follow request...");
    loading.value = true;

    const { data } = await client.value.acceptFollowRequest(follower.id);

    toast.dismiss(id);
    toast.success("Follow request accepted.");
    relationship.value = data;
    loading.value = false;
};

const reject = async () => {
    const id = toast.loading("Rejecting follow request...");
    loading.value = true;

    const { data } = await client.value.rejectFollowRequest(follower.id);

    toast.dismiss(id);
    toast.success("Follow request rejected.");
    relationship.value = data;
    loading.value = false;
};
</script>