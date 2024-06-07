<template>
    <ClientOnly>
        <div class="flex min-h-screen relative flex-col justify-center px-6 py-12 lg:px-8">

            <div class="mx-auto max-w-md mt-10">
                <h1 class="text-2xl font-bold tracking-tight text-gray-50 sm:text-4xl">Here's your code
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-300">You have signed in successfully. Your code is
                </p>
                <div class="prose prose-invert select-all mt-6">
                    <pre
                        class="overflow-x-hidden whitespace-normal break-all bg-dark-500 ring-1 ring-white/10"><code class="text-wrap max-w-full">{{ code }}</code></pre>
                </div>
                <p class="mt-6 text-lg leading-8 text-gray-300">Paste this code into the application you are signing in
                    to.
                </p>

                <p class="mt-6 text-lg leading-8 text-gray-300">
                    Found a problem? Report it on <a href="https://github.com/lysand-org/lysand/issues/new/choose"
                        target="_blank" class="underline text-pink-700">the issue tracker</a>.
                </p>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const query = useRoute().query;

const code = query.code;
</script>
