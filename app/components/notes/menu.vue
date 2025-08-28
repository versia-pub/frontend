<script setup lang="tsx">
import {
    Ban,
    Code,
    Delete,
    ExternalLink,
    Flag,
    Hash,
    Link,
    Pencil,
    Trash,
} from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { confirmModalService } from "~/components/modals/composable.ts";
import * as m from "~~/paraglide/messages.js";

const { authorId, noteId } = defineProps<{
    apiNoteString: string;
    isRemote: boolean;
    url: string;
    remoteUrl?: string;
    authorId: string;
    noteId: string;
}>();

const emit = defineEmits<{
    edit: [];
    delete: [];
}>();

const { copy } = useClipboard();
const authStore = useAuthStore();
const authorIsMe = authStore.isSignedIn && authorId === authStore.account?.id;

const copyText = (text: string) => {
    copy(text);
    toast.success(m.flat_nice_worm_dream());
};

const blockUser = async (userId: string) => {
    const id = toast.loading(m.top_cute_bison_nudge());
    await authStore.client.blockAccount(userId);
    toast.dismiss(id);

    toast.success(m.main_weary_racoon_peek());
};

const _delete = async () => {
    if (preferences.confirm_actions.value.includes("delete")) {
        const confirmation = await confirmModalService.confirm({
            title: m.calm_icy_weasel_twirl(),
            message: m.gray_fun_toucan_slide(),
            confirmText: m.royal_best_tern_transform(),
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading(m.new_funny_fox_boil());
    await authStore.client.deleteStatus(noteId);
    toast.dismiss(id);

    toast.success(m.green_tasty_bumblebee_beam());
    emit("delete");
};
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <slot />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-56">
            <DropdownMenuGroup>
                <DropdownMenuItem v-if="authorIsMe" as="button" @click="emit('edit')">
                    <Pencil />
                    {{ m.front_lime_grizzly_persist() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(apiNoteString)">
                    <Code />
                    {{ m.yummy_moving_scallop_sail() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(noteId)">
                    <Hash />
                    {{ m.sunny_zany_jellyfish_pop() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem as="button" @click="copyText(url)">
                    <Link />
                    {{ m.ago_new_pelican_drip() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" v-if="isRemote && remoteUrl" @click="copyText(remoteUrl)">
                    <Link />
                    {{ m.solid_witty_zebra_walk() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="a" v-if="isRemote" target="_blank" rel="noopener noreferrer" :href="remoteUrl">
                    <ExternalLink />
                    {{ m.active_trite_lark_inspire() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="authorIsMe" />
            <DropdownMenuGroup v-if="authorIsMe">
                <DropdownMenuItem as="button" :disabled="true">
                    <Delete />
                    {{ m.real_green_clownfish_pet() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="_delete">
                    <Trash />
                    {{ m.tense_quick_cod_favor() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="authStore.isSignedIn && !authorIsMe" />
            <DropdownMenuGroup v-if="authStore.isSignedIn && !authorIsMe">
                <DropdownMenuItem as="button" :disabled="true">
                    <Flag />
                    {{ m.great_few_jaguar_rise() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="blockUser(authorId)">
                    <Ban />
                    {{ m.misty_soft_sparrow_vent() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
