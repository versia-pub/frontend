<template>
    <Alert>
        <AlertTitle>{{ m.steep_suave_fish_snap() }}</AlertTitle>
        <AlertDescription>
            {{ m.muddy_bland_shark_accept() }}
        </AlertDescription>
    </Alert>
</template>

<script lang="ts" setup>
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import * as m from "~/paraglide/messages.js";
</script>

<style></style>
