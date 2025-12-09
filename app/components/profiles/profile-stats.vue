<template>
    <Row class="gap-2 w-full justify-around">
        <Column centered>
            <Bold>{{ noteCount }}</Bold>
            <Small muted>{{ m.real_gray_stork_seek() }}</Small>
        </Column>
        <Column centered>
            <Bold>{{ followerCount }}</Bold>
            <Small muted>{{ m.teal_helpful_parakeet_hike() }}</Small>
        </Column>
        <Column centered>
            <Bold>{{ followingCount }}</Bold>
            <Small muted>{{ m.aloof_royal_samuel_startle() }}</Small>
        </Column>
    </Row>
</template>

<script lang="ts" setup>
import * as m from "~~/paraglide/messages.js";
import Bold from "../typography/bold.vue";
import Column from "../typography/layout/col.vue";
import Row from "../typography/layout/row.vue";
import Small from "../typography/small.vue";

const { noteCount, followerCount, followingCount } = defineProps<{
    noteCount: number;
    followerCount: number;
    followingCount: number;
}>();
</script>
