<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row flex-wrap gap-2 *:flex *:items-center *:gap-1 *:text-muted-foreground">
            <div>
                <CalendarDays class="size-4" />
                Joined <span class="text-primary font-semibold">{{ formattedCreationDate }}</span>
            </div>
        </div>
        <div class="flex flex-row flex-wrap gap-2 *:flex *:items-center *:gap-1 *:text-muted-foreground">
            <div>
                <span class="text-primary font-semibold">{{ noteCount }}</span> Notes
            </div>
            &middot;
            <div>
                <span class="text-primary font-semibold">{{ followerCount }}</span> Followers
            </div>
            &middot;
            <div>
                <span class="text-primary font-semibold">{{ followingCount }}</span> Following
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CalendarDays } from "lucide-vue-next";

const { creationDate } = defineProps<{
    creationDate: Date;
    noteCount: number;
    followerCount: number;
    followingCount: number;
}>();

const formattedCreationDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
}).format(creationDate);
</script>