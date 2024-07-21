<script setup lang="ts">
import SquarePattern from "../graphics/square-pattern.vue";
</script>

<template>
    <div
        class="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 fixed inset-0 z-[1000000] bg-background-900">
        <SquarePattern />
        <div class="prose prose-invert max-w-lg">
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-text-100 sm:text-5xl">JavaScript is disabled
            </h1>
            <p class="mt-6 text-base leading-7 text-text-400">
                This website requires JavaScript to function properly. Please enable JavaScript in your browser
                settings.
            </p>
            <p class="mt-6 text-base leading-7 text-text-400">
                If you are using a browser that does not support JavaScript, please consider using a modern browser
                like <a href="https://www.mozilla.org/firefox/new/" class="underline">Firefox</a> or <a
                    href="https://www.google.com/chrome/" class="underline">Chrome</a>.
            </p>
            <p class="mt-6 text-base leading-7 text-text-400">
                This application does not track you, collect user data, use cookies of any kind or send requests to
                servers outside of your account's instance.
            </p>
        </div>
    </div>
</template>