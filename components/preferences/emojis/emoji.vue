<template>
    <DropdownMenu>
        <Card
            :class="
                cn(
                    'grid hover:cursor-pointer gap-4 items-center p-4',
                    canEdit
                        ? 'grid-cols-[auto,1fr,auto]'
                        : 'grid-cols-[auto,1fr]'
                )
            "
        >
            <Avatar shape="square">
                <AvatarImage :src="emoji.url" />
            </Avatar>
            <CardHeader class="p-0 gap-0 overflow-hidden">
                <CardTitle as="span" class="text-sm font-mono truncate">
                    {{ emoji.shortcode }}
                </CardTitle>
                <CardDescription>
                    {{
                        emoji.global
                            ? m.real_tame_moose_greet()
                            : m.witty_heroic_trout_cry()
                    }}
                </CardDescription>
            </CardHeader>
            <CardFooter class="p-0" v-if="canEdit">
                <DropdownMenuTrigger :as-child="true">
                    <Button variant="ghost" size="icon">
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
            </CardFooter>
        </Card>
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
import { cn } from "@/lib/utils";
import { type Emoji, RolePermission } from "@versia/client/types";
import { Delete, Ellipsis, TextCursorInput } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { confirmModalService } from "~/components/modals/composable";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import * as m from "~/paraglide/messages.js";

const { emoji } = defineProps<{
    emoji: Emoji;
}>();

const permissions = usePermissions();
const canEdit =
    (!emoji.global &&
        permissions.value.includes(RolePermission.ManageOwnEmojis)) ||
    permissions.value.includes(RolePermission.ManageEmojis);

const editName = async () => {
    if (!identity.value) {
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
            const { data } = await client.value.updateEmoji(emoji.id, {
                shortcode: result.value,
            });

            toast.dismiss(id);
            toast.success(m.gaudy_lime_bison_adore());

            identity.value.emojis = identity.value.emojis.map((e) =>
                e.id === emoji.id ? data : e
            );
        } catch {
            toast.dismiss(id);
        }
    }
};

const _delete = async () => {
    if (!identity.value) {
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
            await client.value.deleteEmoji(emoji.id);
            toast.dismiss(id);
            toast.success(m.crisp_whole_canary_tear());

            identity.value.emojis = identity.value.emojis.filter(
                (e) => e.id !== emoji.id
            );
        } catch {
            toast.dismiss(id);
        }
    }
};
</script>
