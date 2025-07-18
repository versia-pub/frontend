<template>
    <Button variant="secondary" :disabled="isLoading || relationship?.requested" v-if="!isMe && identity"
        @click="relationship?.following ? unfollow() : follow()">
        <Loader v-if="isLoading" class="animate-spin" />
        <span v-else>
            {{
                relationship?.following
                    ? m.brief_upper_otter_cuddle()
                    : relationship?.requested
                        ? m.weak_bright_larva_grasp()
                        : m.lazy_major_loris_grasp()
            }}
        </span>
    </Button>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/schemas";
import { Loader } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import * as m from "~~/paraglide/messages.js";
import { confirmModalService } from "../modals/composable";

const { account } = defineProps<{
    account: z.infer<typeof Account>;
}>();

const { relationship, isLoading } = useRelationship(client, account.id);
const isMe = identity.value?.account.id === account.id;

const follow = async () => {
    if (preferences.confirm_actions.value.includes("follow")) {
        const confirmation = await confirmModalService.confirm({
            title: m.many_fair_capybara_imagine(),
            message: m.mellow_yummy_jannes_cuddle({
                acct: `@${account.acct}`,
            }),
            confirmText: m.cuddly_even_tern_loop(),
            cancelText: m.soft_bold_ant_attend(),
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading(m.quick_basic_peacock_bubble());
    const { data } = await client.value.followAccount(account.id);
    toast.dismiss(id);

    relationship.value = data;
    toast.success(m.awake_quick_cuckoo_smile());
};

const unfollow = async () => {
    if (preferences.confirm_actions.value.includes("follow")) {
        const confirmation = await confirmModalService.confirm({
            title: m.funny_aloof_swan_loop(),
            message: m.white_best_dolphin_catch({
                acct: `@${account.acct}`,
            }),
            confirmText: m.cute_polite_oryx_blend(),
            cancelText: m.soft_bold_ant_attend(),
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading(m.big_safe_guppy_mix());
    const { data } = await client.value.unfollowAccount(account.id);
    toast.dismiss(id);

    relationship.value = data;
    toast.success(m.misty_level_stingray_expand());
};
</script>
