<template>
    <div class="flex flex-col max-w-72 mx-auto gap-4">
        <Button>Click me</Button>
        <Button theme="primary">Click me</Button>
        <Button theme="secondary">Click me</Button>
        <Button theme="gradient">Click me</Button>

        <Button loading>Click me</Button>
        <Button theme="primary" loading>Click me</Button>
        <Button theme="secondary" loading>Click me</Button>
        <Button theme="gradient" loading>Click me</Button>

        <Button><Icon icon="tabler:certificate" />Gamer</Button>
        <Button theme="primary"><Icon icon="tabler:certificate" />Gamer</Button>
        <Button theme="secondary"><Icon icon="tabler:certificate" />Gamer</Button>
        <Button theme="gradient"><Icon icon="tabler:certificate" />Gamer</Button>

        <Button><Icon icon="tabler:certificate" /></Button>
        <Button theme="primary"><Icon icon="tabler:certificate" /></Button>
        <Button theme="secondary"><Icon icon="tabler:certificate" /></Button>
        <Button theme="gradient"><Icon icon="tabler:certificate" /></Button>

        <Button>Gamer<Icon icon="tabler:certificate" /></Button>
        <Button theme="primary">Gamer<Icon icon="tabler:certificate" /></Button>
        <Button theme="secondary">Gamer<Icon icon="tabler:certificate" /></Button>
        <Button theme="gradient">Gamer<Icon icon="tabler:certificate" /></Button>
    </div>
</template>

<script setup lang="ts">
import Button from "../components/buttons/button.vue";
import Icon from "../components/icons/icon.vue";
</script>