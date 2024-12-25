<template>
    <div class="flex flex-row w-full items-stretch justify-around text-sm *:max-w-28 *:w-full *:text-muted-foreground">
        <Button variant="ghost" @click="emit('reply')" :title="m.drab_tense_turtle_comfort()" :disabled="!identity">
            <Reply class="size-5 text-primary" />
            {{ numberFormat(replyCount) }}
        </Button>
        <Button variant="ghost" @click="liked ? unlike() : like()" :title="liked ? m.vexed_fluffy_clownfish_dance() : m.royal_close_samuel_scold()" :disabled="!identity" :class="liked && '*:fill-red-600 *:text-red-600'">
            <Heart class="size-5 text-primary" />
            {{ numberFormat(likeCount) }}
        </Button>
        <Button variant="ghost" @click="reblogged ? unreblog() : reblog()" :title="reblogged ? m.lime_neat_ox_stab() : m.aware_helpful_marlin_drop()" :disabled="!identity" :class="reblogged && '*:text-green-600'">
            <Repeat class="size-5 text-primary" />
            {{ numberFormat(reblogCount) }}
        </Button>
        <Button variant="ghost" @click="emit('quote')" :title="m.true_shy_jackal_drip()" :disabled="!identity">
            <Quote class="size-5 text-primary" />
        </Button>
        <Menu :api-note-string="apiNoteString" :url="url" :remote-url="remoteUrl" :is-remote="isRemote" :author-id="authorId" @edit="emit('edit')" :note-id="noteId" @delete="emit('delete')">
            <Button variant="ghost" :title="m.busy_merry_cowfish_absorb()">
                <Ellipsis class="size-5 text-primary" />
            </Button>
        </Menu>
    </div>
</template>

<script lang="ts" setup>
import { Ellipsis, Heart, Quote, Repeat, Reply } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";
import * as m from "~/paraglide/messages.js";
import { SettingIds } from "~/settings";
import { confirmModalService } from "../modals/composable";
import Menu from "./menu.vue";

const { noteId } = defineProps<{
    replyCount: number;
    likeCount: number;
    reblogCount: number;
    apiNoteString: string;
    noteId: string;
    isRemote: boolean;
    url: string;
    remoteUrl: string;
    authorId: string;
    liked: boolean;
    reblogged: boolean;
}>();

const emit = defineEmits<{
    edit: [];
    reply: [];
    quote: [];
    delete: [];
}>();
const { play } = useAudio();

const confirmLikes = useSetting(SettingIds.ConfirmLike);
const confirmReblogs = useSetting(SettingIds.ConfirmReblog);

const like = async () => {
    if (confirmLikes.value.value) {
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
    const { data } = await client.value.favouriteStatus(noteId);
    toast.dismiss(id);
    toast.success(m.mealy_slow_buzzard_commend());
    useEvent("note:edit", data);
};

const unlike = async () => {
    if (confirmLikes.value.value) {
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
    const { data } = await client.value.unfavouriteStatus(noteId);
    toast.dismiss(id);
    toast.success(m.fresh_direct_bear_affirm());
    useEvent("note:edit", data);
};

const reblog = async () => {
    if (confirmReblogs.value.value) {
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
    const { data } = await client.value.reblogStatus(noteId);
    toast.dismiss(id);
    toast.success(m.weird_moving_hawk_lift());
    useEvent("note:edit", data.reblog || data);
};

const unreblog = async () => {
    if (confirmReblogs.value.value) {
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
    const { data } = await client.value.unreblogStatus(noteId);
    toast.dismiss(id);
    toast.success(m.royal_polite_moose_catch());
    useEvent("note:edit", data);
};

const numberFormat = (number = 0) =>
    number !== 0
        ? new Intl.NumberFormat(getLanguageTag(), {
              notation: "compact",
              compactDisplay: "short",
              maximumFractionDigits: 1,
          }).format(number)
        : undefined;
</script>
