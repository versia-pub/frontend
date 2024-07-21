<template>
    <div
        class="w-full md:px-8 px-4 py-4 bg-background-700 grid justify-center lg:grid-cols-[minmax(auto,_36rem)_1fr] grid-cols-1 gap-4">
        <form class="w-full ring-1 ring-inset ring-white/5 pb-5 bg-background-800 rounded overflow-hidden"
            @submit.prevent="save">
            <Avatar :src="account?.header" :alt="`${account?.acct}'s header image'`"
                class="w-full aspect-[8/3] border-b border-white/10 bg-background-700 !rounded-none" />

            <div class="flex items-start justify-between px-4 py-3">
                <Avatar :src="account?.avatar" :alt="`${account?.acct}'s avatar'`"
                    class="h-32 w-32 -mt-[4.5rem] z-10 shrink-0 rounded ring-2 ring-background-800" />
            </div>

            <div class="mt-2 px-4">
                <TextInput @input="displayName = ($event.target as HTMLInputElement).value" :value="displayName"
                    aria-label="Display name" :disabled="loading" />
                <div class="mt-2 grid grid-cols-[auto_1fr] items-center gap-x-2">
                    <iconify-icon icon="tabler:at" width="none" class="size-6" aria-hidden="true" />
                    <TextInput @input="acct = ($event.target as HTMLInputElement).value" :value="acct"
                        aria-label="Username" :disabled="loading" />
                </div>
                <p class="text-text-300 text-xs mt-2">
                    Changing your username will break all links to your profile.
                </p>
            </div>

            <div class="mt-3 px-4">
                <RichTextboxInput v-model:model-content="note" :max-characters="bio" :disabled="loading"
                    class="rounded ring-white/10 ring-2 focus:ring-primary-600 px-4 py-2 max-h-[40dvh] max-w-full" />
            </div>

            <div class="px-4 mt-4 grid grid-cols-2 gap-2">
                <Button theme="primary" class="w-full" type="submit" :loading="loading">
                    <span>Save</span>
                </Button>
                <Button theme="secondary" class="w-full" @click="revert" type="button" :loading="loading">
                    <span>Revert</span>
                </Button>
            </div>
        </form>
        <div>
            <Oidc />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ResponseError } from "@lysand-org/client";
import Button from "~/packages/ui/components/buttons/button.vue";
import Avatar from "../avatars/avatar.vue";
import RichTextboxInput from "../inputs/rich-textbox-input.vue";
import TextInput from "../inputs/text-input.vue";
import Oidc from "./oidc.vue";

const account = computed(() => identity.value?.account);
const note = ref(account.value?.source?.note ?? "");
const displayName = ref(account.value?.display_name ?? "");
const acct = ref(account.value?.acct ?? "");
const bio = computed(
    () => identity.value?.instance.configuration.statuses.max_characters ?? 0,
);

const loading = ref(false);

const revert = () => {
    useEvent("notification:new", {
        title: "Reverted to current bio",
        type: "success",
    });

    note.value = account.value?.source?.note ?? "";
};

const save = async () => {
    const changedData = {
        display_name:
            displayName.value === account.value?.display_name
                ? undefined
                : displayName.value,
        username: acct.value === account.value?.acct ? undefined : acct.value,
        note:
            note.value === account.value?.source?.note ? undefined : note.value,
    };

    if (
        Object.values(changedData).filter((v) => v !== undefined).length === 0
    ) {
        useEvent("notification:new", {
            title: "No changes",
            type: "error",
        });

        return;
    }

    loading.value = true;

    try {
        const { data } = await client.value.updateCredentials(
            Object.fromEntries(
                Object.entries(changedData).filter(([, v]) => v !== undefined),
            ),
        );

        useEvent("notification:new", {
            title: "Profile updated",
            type: "success",
        });

        if (identity.value) {
            identity.value.account = data;
        }
    } catch (e) {
        const error = e as ResponseError<{ error: string }>;

        useEvent("notification:new", {
            title: "Failed to update profile",
            description: error.response.data.error,
            type: "error",
        });
    }

    loading.value = false;
};
</script>
