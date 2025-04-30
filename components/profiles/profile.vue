<template>
    <Card class="*:w-full">
        <ProfileHeader
            :header="account.header"
            :avatar="account.avatar"
            :display-name="account.display_name"
        />
        <CardContent>
            <div class="flex flex-row justify-end gap-2">
                <Button
                    variant="secondary"
                    :disabled="isLoading || relationship?.requested"
                    v-if="!isMe && identity"
                    @click="relationship?.following ? unfollow() : follow()"
                >
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
                <ProfileActions :account="account">
                    <Button variant="secondary" size="icon">
                        <Ellipsis />
                    </Button>
                </ProfileActions>
            </div>
            <div class="flex flex-col -mt-1 gap-1 justify-center">
                <CardTitle class="" v-render-emojis="account.emojis">
                    {{ account.display_name }}
                </CardTitle>
                <CopyableText :text="account.acct">
                    <span
                        class="font-semibold bg-gradient-to-tr from-pink-700 dark:from-indigo-400 via-purple-700 dark:via-purple-400 to-indigo-700 dark:to-indigo-400 text-transparent bg-clip-text"
                    >
                        @{{ username }}
                    </span>
                    <span class="text-muted-foreground"
                        >{{ instance && "@" }}{{ instance }}</span
                    >
                </CopyableText>
            </div>
            <ProfileBadges :account="account" class="my-2" />
            <ProfileContent :content="account.note" :emojis="account.emojis" />
        </CardContent>
        <CardFooter class="flex-col *:w-full gap-4">
            <ProfileStats
                :creation-date="new Date(account.created_at || 0)"
                :follower-count="account.followers_count"
                :following-count="account.following_count"
                :note-count="account.statuses_count"
            />
            <Separator v-if="account.fields.length > 0" />
            <ProfileFields
                v-if="account.fields.length > 0"
                :fields="account.fields"
                :emojis="account.emojis"
            />
        </CardFooter>
    </Card>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/types";
import { Ellipsis, Loader } from "lucide-vue-next";
import { toast } from "vue-sonner";
import CopyableText from "~/components/notes/copyable-text.vue";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import * as m from "~/paraglide/messages.js";
import { confirmModalService } from "../modals/composable";
import ProfileActions from "./profile-actions.vue";
import ProfileBadges from "./profile-badges.vue";
import ProfileContent from "./profile-content.vue";
import ProfileFields from "./profile-fields.vue";
import ProfileHeader from "./profile-header.vue";
import ProfileStats from "./profile-stats.vue";

const { account } = defineProps<{
    account: Account;
}>();

const { relationship, isLoading } = useRelationship(client, account.id);
const isMe = identity.value?.account.id === account.id;
const [username, instance] = account.acct.split("@");

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
