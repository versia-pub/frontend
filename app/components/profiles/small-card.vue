<template>
    <div class="relative">
        <div class="bg-muted rounded overflow-hidden h-32 w-full">
            <img
                :src="account.header"
                alt=""
                class="object-cover w-full h-full"
            />
            <!-- Shadow overlay at the bottom -->
            <div
                class="absolute bottom-0 w-full h-1/3 bg-gradient-to-b from-black/0 to-black/40"
            ></div>
        </div>
        <div
            class="absolute bottom-0 left-1/2 translate-y-1/3 -translate-x-1/2 flex flex-row items-start gap-2"
        >
            <Avatar
                size="base"
                class="border"
                :src="account.avatar"
                :name="account.display_name"
            />
        </div>
    </div>
    <div class="flex flex-col justify-center items-center mt-8">
        <Text class="font-bold" v-render-emojis="account.emojis">
            {{ account.display_name }}
        </Text>
        <Address :username="username" :domain="domain" />
    </div>
    <Html
        v-html="account.note"
        v-render-emojis="account.emojis"
        class="mt-4 max-h-72 overflow-y-auto"
    />
    <Separator v-if="account.fields.length > 0" class="mt-4" />
    <ProfileFields
        v-if="account.fields.length > 0"
        :fields="account.fields"
        :emojis="account.emojis"
        class="mt-4 max-h-48 overflow-y-auto"
    />
</template>

<script lang="ts" setup>
import type { Account } from "@versia/client/schemas";
import type { z } from "zod";
import { Separator } from "~/components/ui/separator";
import Html from "../typography/html.vue";
import Text from "../typography/text.vue";
import Address from "./address.vue";
import Avatar from "./avatar.vue";
import ProfileFields from "./profile-fields.vue";

const { account } = defineProps<{
    account: z.infer<typeof Account>;
}>();

const [username, domain] = account.acct.split("@");
</script>
