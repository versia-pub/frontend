<template>
    <div
        :class="[
        'prose prose-sm block relative dark:prose-invert duration-200 !max-w-full break-words prose-a:no-underline hover:prose-a:underline',
        $style.content,
    ]"
    >
        <slot />
    </div>
</template>

<style module>
@import "~/styles/content.css";
</style>
