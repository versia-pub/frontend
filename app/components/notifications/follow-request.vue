<template>
    <div
        v-if="relationship?.requested_by !== false"
        class="flex flex-row items-center gap-3 p-4"
    >
        <NuxtLink :href="followerUrl" class="relative size-10">
            <Avatar
                class="size-10 border border-border"
                :src="follower.avatar"
                :name="follower.display_name"
            />
        </NuxtLink>
        <div
            class="flex flex-col gap-0.5 justify-center flex-1 text-left leading-tight text-sm"
        >
            <span
                class="truncate font-semibold"
                v-render-emojis="follower.emojis"
                >{{
                follower.display_name
                }}</span
            >
            <span class="truncate tracking-tight">
                <Address :username="username" :domain="domain"/>
            </span>
        </div>
    </div>
    <div v-if="loading" class="flex p-2 items-center justify-center h-12">
        <Loader class="size-4 animate-spin"/>
    </div>
    <div
        v-else-if="relationship?.requested_by === false"
        class="flex p-2 items-center justify-center h-12"
    >
        <Check class="size-4"/>
    </div>
    <div v-else class="grid grid-cols-2 p-2 gap-2">
        <Button
            variant="secondary"
            size="sm"
            @click="accept"
            :title="m.slow_these_kestrel_sail()"
        >
            <Check/>
        </Button>
        <Button
            variant="ghost"
            size="sm"
            @click="reject"
            :title="m.weary_steep_yak_embrace()"
        >
            <X/>
        </Button>
    </div>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/schemas";
import { Check, Loader, X } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import * as m from "~~/paraglide/messages.js";
import Address from "../profiles/address.vue";
import Avatar from "../profiles/avatar.vue";

const { follower } = defineProps<{
    follower: z.infer<typeof Account>;
}>();

const loading = ref(true);
const followerUrl = `/@${follower.acct}`;
const [username, domain] = follower.acct.split("@");
const { relationship } = useRelationship(follower.id);
const authStore = useAuthStore();

// TODO: Add "followed" notification
watch(relationship, () => {
    if (relationship.value) {
        loading.value = false;
    }
});

const accept = async () => {
    const id = toast.loading(m.cool_slimy_coyote_affirm());
    loading.value = true;

    const { data } = await authStore.client.acceptFollowRequest(follower.id);

    toast.dismiss(id);
    toast.success(m.busy_awful_mouse_jump());
    relationship.value = data;
    loading.value = false;
};

const reject = async () => {
    const id = toast.loading(m.front_sunny_penguin_flip());
    loading.value = true;

    const { data } = await authStore.client.rejectFollowRequest(follower.id);

    toast.dismiss(id);
    toast.success(m.green_flat_mayfly_trust());
    relationship.value = data;
    loading.value = false;
};
</script>
