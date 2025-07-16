<template>
    <Alert layout="button">
        <TriangleAlert />
        <AlertTitle>{{ contentWarning || m.sour_seemly_bird_hike() }}</AlertTitle>
        <Button @click="blurred = !blurred" variant="outline" size="sm">{{ blurred ? m.bald_direct_turtle_win() :
            m.known_flaky_cockroach_dash() }}</Button>
    </Alert>
</template>

<script lang="ts" setup>
import { TriangleAlert } from "lucide-vue-next";
import * as m from "~~/paraglide/messages.js";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

const { contentWarning } = defineProps<{
    contentWarning?: string;
}>();

const blurred = defineModel<boolean>({
    default: true,
});
</script>
