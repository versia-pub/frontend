<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                variant="ghost"
                size="icon"
                title="Open menu"
                class="size-8 p-0"
            >
                <MoreHorizontal class="size-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-48">
            <DropdownMenuItem @click="editName">
                <TextCursorInput />
                {{ m.cuddly_such_swallow_hush() }}
            </DropdownMenuItem>
            <!-- <DropdownMenuItem @click="editCaption">
                <Captions />
                <span>Add caption</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> -->
            <DropdownMenuItem @click="_delete">
                <Delete />
                {{ m.tense_quick_cod_favor() }}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { type CustomEmoji, RolePermission } from "@versia/client/schemas";
import { Delete, MoreHorizontal, TextCursorInput } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { z } from "zod";
import { confirmModalService } from "~/components/modals/composable";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import * as m from "~~/paraglide/messages.js";

const { emoji } = defineProps<{
    emoji: z.infer<typeof CustomEmoji>;
}>();

const authStore = useAuthStore();

const editName = async () => {
    if (!authStore.isSignedIn) {
        return;
    }

    const result = await confirmModalService.confirm({
        title: m.slimy_awful_florian_sail(),
        defaultValue: emoji.shortcode,
        confirmText: m.teary_antsy_panda_aid(),
        inputType: "text",
    });

    if (result.confirmed) {
        const id = toast.loading(m.teary_tame_gull_bless());
        try {
            const { data } = await authStore.client.updateEmoji(emoji.id, {
                shortcode: result.value,
            });

            toast.dismiss(id);
            toast.success(m.gaudy_lime_bison_adore());

            authStore.updateActiveIdentity({
                emojis: authStore.emojis.map((e) =>
                    e.id === emoji.id ? data : e,
                ),
            });
        } catch {
            toast.dismiss(id);
        }
    }
};

const _delete = async () => {
    if (!authStore.isSignedIn) {
        return;
    }

    const { confirmed } = await confirmModalService.confirm({
        title: m.tense_quick_cod_favor(),
        message: m.honest_factual_carp_aspire(),
        confirmText: m.tense_quick_cod_favor(),
    });

    if (confirmed) {
        const id = toast.loading(m.weary_away_liger_zip());
        try {
            await authStore.client.deleteEmoji(emoji.id);
            toast.dismiss(id);
            toast.success(m.crisp_whole_canary_tear());

            authStore.updateActiveIdentity({
                emojis: authStore.emojis.filter((e) => e.id !== emoji.id),
            });
        } catch {
            toast.dismiss(id);
        }
    }
};
</script>
