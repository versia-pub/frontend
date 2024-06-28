<template>
    <slot name="error" v-if="error" v-bind="{ error }">
        <div id="error" class="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div class="text-center prose prose-invert max-w-md w-full">
                <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">{{ error.title }}
                </h1>
                <p class="mt-6 text-base leading-7 text-gray-400" v-html="error.message"></p>
                <div class="mt-10 grid grid-cols-2 gap-x-6 mx-auto max-w-md">
                    <Button theme="primary" class="w-full" @click="back">Go back</Button>
                    <a href="https://github.com/lysand-org/lysand-fe/issues" target="_blank">
                        <Button theme="secondary" class="w-full">Report an issue</Button>
                    </a>
                </div>
            </div>
        </div>
    </slot>
    <slot v-else />
</template>

<script lang="ts" setup>
import Button from "~/packages/ui/components/buttons/button.vue";

const error = ref<{
    title: string;
    message: string;
    code: string;
} | null>(null);

useListen("error", (err) => {
    error.value = err;

    useHead({
        title: err?.title,
    });
});

const back = () => {
    useRouter().back();
};
</script>

<style>
#error code:not(pre code)::after,
#error code:not(pre code)::before {
    content: ""
}

#error code:not(pre code) {
    border-radius: .25rem;
    padding: .25rem .5rem;
    word-wrap: break-word;
    background: transparent;
    background-color: #ffffff0d;
    -webkit-hyphens: none;
    hyphens: none;
    margin-top: 1rem;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: hsla(0, 0%, 100%, .1)
}
</style>