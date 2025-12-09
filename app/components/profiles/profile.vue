<template>
    <Card class="gap-4">
        <ProfileHeader
            :header="account.header"
            :avatar="account.avatar"
            :display-name="account.display_name"
        />
        <Row class="justify-end gap-2">
            <ProfileRelationshipActions :account="account"/>
            <ProfileActions :account="account">
                <Button variant="secondary" size="icon">
                    <Ellipsis/>
                </Button>
            </ProfileActions>
        </Row>
        <Column class="justify-center">
            <Text class="font-bold" v-render-emojis="account.emojis">
                {{ account.display_name }}
            </Text>
            <Address :username="username" :domain="domain"/>
        </Column>
        <ProfileBadges :account="account"/>
        <Html v-html="account.note" v-render-emojis="account.emojis"/>
        <Separator/>
        <ProfileFields
            v-if="account.fields.length > 0"
            :fields="account.fields"
            :emojis="account.emojis"
        />
        <Separator v-if="account.fields.length > 0"/>
        <Row>
            <HeadingSmall class="flex items-center gap-1">
                <CalendarDays class="size-4"/>
                {{ formattedCreationDate }}
            </HeadingSmall>
        </Row>
        <Separator/>
        <ProfileStats
            :follower-count="account.followers_count"
            :following-count="account.following_count"
            :note-count="account.statuses_count"
        />
    </Card>
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/schemas";
import { CalendarDays, Ellipsis } from "lucide-vue-next";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { getLocale } from "~~/paraglide/runtime";
import HeadingSmall from "../typography/headings/small.vue";
import Html from "../typography/html.vue";
import Column from "../typography/layout/col.vue";
import Row from "../typography/layout/row.vue";
import Text from "../typography/text.vue";
import Address from "./address.vue";
import ProfileActions from "./profile-actions.vue";
import ProfileBadges from "./profile-badges.vue";
import ProfileFields from "./profile-fields.vue";
import ProfileHeader from "./profile-header.vue";
import ProfileRelationshipActions from "./profile-relationship-actions.vue";
import ProfileStats from "./profile-stats.vue";

const { account } = defineProps<{
    account: z.infer<typeof Account>;
}>();

const [username, domain] = account.acct.split("@");

const formattedCreationDate = new Intl.DateTimeFormat(getLocale(), {
    dateStyle: "long",
    timeStyle: "short",
}).format(new Date(account.created_at || 0));
</script>
