<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row flex-wrap gap-2 *:flex *:items-center *:gap-1 *:text-muted-foreground">
            <div>
                <CalendarDays class="size-4" />
                {{ m.gross_fancy_platypus_seek() }} <span class="text-primary font-semibold">{{ formattedCreationDate }}</span>
            </div>
        </div>
        <div class="flex flex-row flex-wrap gap-2 *:flex *:items-center *:gap-1 *:text-muted-foreground">
            <div>
                <span class="text-primary font-semibold">{{ noteCount }}</span> {{ m.real_gray_stork_seek() }}
            </div>
            &middot;
            <div>
                <span class="text-primary font-semibold">{{ followerCount }}</span> {{ m.teal_helpful_parakeet_hike() }}
            </div>
            &middot;
            <div>
                <span class="text-primary font-semibold">{{ followingCount }}</span> {{ m.aloof_royal_samuel_startle() }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CalendarDays } from "lucide-vue-next";
import * as m from "~/paraglide/messages.js";
import { getLocale } from "~/paraglide/runtime";

const { creationDate } = defineProps<{
    creationDate: Date;
    noteCount: number;
    followerCount: number;
    followingCount: number;
}>();

const formattedCreationDate = new Intl.DateTimeFormat(getLocale(), {
    month: "long",
    year: "numeric",
}).format(creationDate);
</script>
