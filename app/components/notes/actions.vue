<template>
    <div class="flex items-center gap-1">
        <ActionButton
            :icon="Reply"
            @click="emit('reply')"
            :title="m.drab_tense_turtle_comfort()"
            :disabled="!authStore.isSignedIn"
        >
            {{ numberFormat(replyCount) }}
        </ActionButton>
        <ActionButton
            :icon="Heart"
            @click="liked ? unlike() : like()"
            :title="liked ? m.vexed_fluffy_clownfish_dance() : m.royal_close_samuel_scold()"
            :disabled="!authStore.isSignedIn"
            :class="liked && '*:fill-red-600 *:text-red-600'"
        >
            {{ numberFormat(likeCount) }}
        </ActionButton>
        <ActionButton
            :icon="Repeat"
            @click="reblogged ? unreblog() : reblog()"
            :title="reblogged ? m.lime_neat_ox_stab() : m.aware_helpful_marlin_drop()"
            :disabled="!authStore.isSignedIn"
            :class="reblogged && '*:text-green-600'"
        >
            {{ numberFormat(reblogCount) }}
        </ActionButton>
        <ActionButton
            :icon="Quote"
            @click="emit('quote')"
            :title="m.true_shy_jackal_drip()"
            :disabled="!authStore.isSignedIn"
        />
        <Picker @pick="react">
            <ActionButton
                :icon="Smile"
                :title="m.bald_cool_kangaroo_jump()"
                :disabled="!authStore.isSignedIn"
            />
        </Picker>
    </div>
</template>

<script lang="ts" setup>
import type { CustomEmoji, Status } from "@versia/client/schemas";
import { Heart, Quote, Repeat, Reply, Smile } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { z } from "zod";
import * as m from "~~/paraglide/messages.js";
import { getLocale } from "~~/paraglide/runtime";
import { confirmModalService } from "../modals/composable";
import ActionButton from "./action-button.vue";
import type { UnicodeEmoji } from "./reactions/picker/emoji";
import Picker from "./reactions/picker/index.vue";

const { noteId } = defineProps<{
    replyCount: number;
    likeCount: number;
    reblogCount: number;
    apiNoteString: string;
    noteId: string;
    isRemote: boolean;
    url: string;
    remoteUrl?: string;
    authorId: string;
    liked: boolean;
    reblogged: boolean;
}>();

const emit = defineEmits<{
    edit: [];
    reply: [];
    quote: [];
    delete: [];
    react: [];
}>();
const { play } = useAudio();
const authStore = useAuthStore();

const like = async () => {
    if (preferences.confirm_actions.value.includes("like")) {
        const confirmation = await confirmModalService.confirm({
            title: m.slimy_least_ray_aid(),
            message: m.stale_new_ray_jolt(),
            confirmText: m.royal_close_samuel_scold(),
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    play("like");
    const id = toast.loading(m.slimy_candid_tiger_read());
    const { data } = await authStore.client.favouriteStatus(noteId);
    toast.dismiss(id);
    toast.success(m.mealy_slow_buzzard_commend());
    useEvent("note:edit", data);
};

const unlike = async () => {
    if (preferences.confirm_actions.value.includes("like")) {
        const confirmation = await confirmModalService.confirm({
            title: m.odd_strong_halibut_prosper(),
            message: m.slow_blue_parrot_savor(),
            confirmText: m.vexed_fluffy_clownfish_dance(),
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading(m.busy_active_leopard_strive());
    const { data } = await authStore.client.unfavouriteStatus(noteId);
    toast.dismiss(id);
    toast.success(m.fresh_direct_bear_affirm());
    useEvent("note:edit", data);
};

const reblog = async () => {
    if (preferences.confirm_actions.value.includes("reblog")) {
        const confirmation = await confirmModalService.confirm({
            title: m.best_mellow_llama_surge(),
            message: m.salty_plain_mallard_gaze(),
            confirmText: m.aware_helpful_marlin_drop(),
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading(m.late_sunny_cobra_scold());
    const { data } = await authStore.client.reblogStatus(noteId);
    toast.dismiss(id);
    toast.success(m.weird_moving_hawk_lift());
    useEvent(
        "note:edit",
        (data.reblog as z.infer<typeof Status> | null) || data,
    );
};

const unreblog = async () => {
    if (preferences.confirm_actions.value.includes("reblog")) {
        const confirmation = await confirmModalService.confirm({
            title: m.main_fancy_octopus_loop(),
            message: m.odd_alive_swan_express(),
            confirmText: m.lime_neat_ox_stab(),
            inputType: "none",
        });

        if (!confirmation.confirmed) {
            return;
        }
    }

    const id = toast.loading(m.white_sharp_gorilla_embrace());
    const { data } = await authStore.client.unreblogStatus(noteId);
    toast.dismiss(id);
    toast.success(m.royal_polite_moose_catch());
    useEvent("note:edit", data);
};

const react = async (emoji: z.infer<typeof CustomEmoji> | UnicodeEmoji) => {
    const id = toast.loading(m.gray_stale_antelope_roam());
    const text = (emoji as UnicodeEmoji).hexcode
        ? (emoji as UnicodeEmoji).unicode
        : `:${(emoji as z.infer<typeof CustomEmoji>).shortcode}:`;

    const { data } = await authStore.client.createEmojiReaction(noteId, text);

    toast.dismiss(id);
    toast.success(m.main_least_turtle_fall());
    useEvent("note:edit", data);
};

const numberFormat = (number = 0) =>
    number !== 0
        ? new Intl.NumberFormat(getLocale(), {
              notation: "compact",
              compactDisplay: "short",
              maximumFractionDigits: 1,
          }).format(number)
        : undefined;
</script>
