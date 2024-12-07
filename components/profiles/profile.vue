<template>
    <Card>
        <ProfileHeader :header="account.header" :avatar="account.avatar" :display-name="account.display_name" />
        <CardContent class="pt-3 gap-4 flex flex-col">
            <div class="flex flex-row justify-end gap-2">
                <Button variant="secondary" :disabled="isLoading || relationship?.requested" v-if="!isMe && identity"
                    @click="relationship?.following ? unfollow() : follow()">
                    <Loader v-if="isLoading" class="animate-spin" />
                    <span v-else>
                        {{ relationship?.following ? m.brief_upper_otter_cuddle() : relationship?.requested ? m.weak_bright_larva_grasp() : m.lazy_major_loris_grasp() }}
                    </span>
                </Button>
                <ProfileActions :account="account">
                    <Button variant="secondary" size="icon">
                        <Ellipsis />
                    </Button>
                </ProfileActions>
            </div>
            <div class="flex flex-col -mt-1 gap-2 justify-center">
                <CardTitle class="" v-render-emojis="account.emojis">
                    {{ account.display_name }}
                </CardTitle>
                <CopyableText :text="account.acct">
                    <span
                        class="font-semibold bg-gradient-to-tr from-pink-700 dark:from-indigo-400 via-purple-700 dark:via-purple-400 to-indigo-700 dark:to-indigo-400 text-transparent bg-clip-text">
                        @{{ username }}
                    </span>
                    <span class="text-muted-foreground">{{ instance && "@" }}{{ instance }}</span>
                </CopyableText>
            </div>
            <div class="flex flex-row flex-wrap gap-2 -mx-2" v-if="isDeveloper || account.bot || roles.length > 0">
                <ProfileBadge v-if="isDeveloper" :name="m.nice_bad_grizzly_coax()" :description="m.honest_jolly_shell_blend()"
                    :verified="true" />
                <ProfileBadge v-if="account.bot" :name="m.merry_red_shrimp_bump()"
                    :description="m.sweet_mad_jannes_create()" />
                <ProfileBadge v-for="role in roles" :key="role.id" :name="role.name" :description="role.description"
                    :icon="role.icon" />
            </div>
            <ProfileContent :content="account.note" :emojis="account.emojis" />
        </CardContent>
        <CardFooter class="flex-col items-start gap-4">
            <ProfileStats :creation-date="new Date(account.created_at || 0)" :follower-count="account.followers_count"
                :following-count="account.following_count" :note-count="account.statuses_count" />
            <Separator v-if="account.fields.length > 0" />
            <ProfileFields v-if="account.fields.length > 0" :fields="account.fields" :emojis="account.emojis" />
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
import { SettingIds } from "~/settings";
import { confirmModalService } from "../modals/composable";
import ProfileActions from "./profile-actions.vue";
import ProfileBadge from "./profile-badge.vue";
import ProfileContent from "./profile-content.vue";
import ProfileFields from "./profile-fields.vue";
import ProfileHeader from "./profile-header.vue";
import ProfileStats from "./profile-stats.vue";

const { account } = defineProps<{
    account: Account;
}>();

const config = useConfig();
const { relationship, isLoading } = useRelationship(client, account.id);
const isMe = identity.value?.account.id === account.id;
const [username, instance] = account.acct.split("@");
const roles = account.roles.filter((r) => r.visible);
// Get user handle in username@instance format
const handle = account.acct.includes("@")
    ? account.acct
    : `${account.acct}@${identity.value?.instance.domain ?? window.location.host}`;
const isDeveloper = config.DEVELOPER_HANDLES.includes(handle);

const confirmFollows = useSetting(SettingIds.ConfirmFollow);

const follow = async () => {
    if (confirmFollows.value.value) {
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
    if (confirmFollows.value.value) {
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