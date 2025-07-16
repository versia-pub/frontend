<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <slot />
        </DropdownMenuTrigger>
         <DropdownMenuContent class="min-w-48">
            <DropdownMenuItem @click="deleteAll" :disabled="!canEdit">
                <Delete />
                {{ m.tense_quick_cod_favor() }}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { type CustomEmoji, RolePermission } from "@versia/client/schemas";
import { Delete } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { z } from "zod";
import { confirmModalService } from "~/components/modals/composable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import * as m from "~~/paraglide/messages.js";

const { emojis } = defineProps<{
    emojis: z.infer<typeof CustomEmoji>[];
}>();

const permissions = usePermissions();
const canEdit =
    (!emojis.some((e) => e.global) &&
        permissions.value.includes(RolePermission.ManageOwnEmojis)) ||
    permissions.value.includes(RolePermission.ManageEmojis);

const deleteAll = async () => {
    if (!identity.value) {
        return;
    }

    const { confirmed } = await confirmModalService.confirm({
        title: m.tense_quick_cod_favor(),
        message: m.next_hour_jurgen_sprout({
            amount: emojis.length,
        }),
        confirmText: m.tense_quick_cod_favor(),
    });

    if (confirmed) {
        const id = toast.loading(
            m.equal_only_crow_file({
                amount: emojis.length,
            }),
        );
        try {
            await Promise.all(
                emojis.map((emoji) => client.value.deleteEmoji(emoji.id)),
            );
            toast.dismiss(id);
            toast.success("Emojis deleted");

            identity.value.emojis = identity.value.emojis.filter(
                (e) => !emojis.some((emoji) => e.id === emoji.id),
            );
        } catch {
            toast.dismiss(id);
        }
    }
};
</script>
