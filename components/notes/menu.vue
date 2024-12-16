<script setup lang="tsx">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { confirmModalService } from "~/components/modals/composable.ts";
import * as m from "~/paraglide/messages.js";
import { SettingIds } from "~/settings";

const { authorId, noteId } = defineProps<{
    apiNoteString: string;
    isRemote: boolean;
    url: string;
    remoteUrl: string;
    authorId: string;
    noteId: string;
}>();

const emit = defineEmits<{
    edit: [];
    delete: [];
}>();

const { copy } = useClipboard();
const loggedIn = !!identity.value;
const authorIsMe = loggedIn && authorId === identity.value?.account.id;

const confirmDeletes = useSetting(SettingIds.ConfirmDelete);

const copyText = (text: string) => {
    copy(text);
    toast.success(m.flat_nice_worm_dream());
};

const blockUser = async (userId: string) => {
    const id = toast.loading(m.top_cute_bison_nudge());
    await client.value.blockAccount(userId);
    toast.dismiss(id);

    toast.success(m.main_weary_racoon_peek());
};

const _delete = async () => {
    if (confirmDeletes.value.value) {
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
    await client.value.deleteStatus(noteId);
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
            <DropdownMenuLabel>{{ m.many_misty_parakeet_fall() }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem v-if="authorIsMe" as="button" @click="emit('edit')">
                    <Pencil class="mr-2 size-4" />
                    {{ m.front_lime_grizzly_persist() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(apiNoteString)">
                    <Code class="mr-2 size-4" />
                    {{ m.yummy_moving_scallop_sail() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="copyText(noteId)">
                    <Hash class="mr-2 size-4" />
                    {{ m.sunny_zany_jellyfish_pop() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem as="button" @click="copyText(url)">
                    <Link class="mr-2 size-4" />
                    {{ m.ago_new_pelican_drip() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" v-if="isRemote" @click="copyText(remoteUrl)">
                    <Link class="mr-2 size-4" />
                    {{ m.solid_witty_zebra_walk() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="a" v-if="isRemote" target="_blank" rel="noopener noreferrer" :href="remoteUrl">
                    <ExternalLink class="mr-2 size-4" />
                    {{ m.active_trite_lark_inspire() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="authorIsMe" />
            <DropdownMenuGroup v-if="authorIsMe">
                <DropdownMenuItem as="button" :disabled="true">
                    <Delete class="mr-2 size-4" />
                    {{ m.real_green_clownfish_pet() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="_delete">
                    <Trash class="mr-2 size-4" />
                    {{ m.tense_quick_cod_favor() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator v-if="loggedIn && !authorIsMe" />
            <DropdownMenuGroup v-if="loggedIn && !authorIsMe">
                <DropdownMenuItem as="button" :disabled="true">
                    <Flag class="mr-2 size-4" />
                    {{ m.great_few_jaguar_rise() }}
                </DropdownMenuItem>
                <DropdownMenuItem as="button" @click="blockUser(authorId)">
                    <Ban class="mr-2 size-4" />
                    {{ m.misty_soft_sparrow_vent() }}
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>