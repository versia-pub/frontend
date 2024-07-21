<template>
    <Tooltip.Root @update:open="(o) => open = o" :open="open" :open-delay="0">
        <Tooltip.Trigger><span
                class="inline-flex items-center px-2 py-1 gap-x-2 rounded text-sm font-medium bg-dark-300 text-primary-200 ring-white/5 ring-1">
                <svg viewBox="0 0 22 22" v-if="verified" aria-label="Verified account" role="img"
                    class="size-4 fill-primary-500">
                    <g>
                        <path
                            d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                        </path>
                    </g>
                </svg>
                <img v-else-if="img" :src="img" alt="" class="size-4 rounded-sm" />
                <iconify-icon v-else-if="icon" :icon="icon" width="none" class="text-primary-200 size-4"
                    aria-hidden="true" />
                <span>{{ name }}</span>
            </span></Tooltip.Trigger>
        <Tooltip.Positioner>
            <transition enter-active-class="transition ease-in duration-100"
                enter-from-class="transform opacity-0 translate-y-full sm:translate-y-0 scale-95"
                enter-to-class="transform translate-y-0 opacity-100 scale-100"
                leave-active-class="transition ease-out duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <Tooltip.Content v-if="open"
                    class="rounded px-4 py-2 text-sm bg-dark-400 text-gray-200 ring-1 ring-white/10 shadow-xl">
                    <svg viewBox="0 0 22 22" v-if="verified" aria-label="Verified account" role="img"
                        class="size-4 fill-primary-500 inline mb-0.5">
                        <g>
                            <path
                                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z">
                            </path>
                        </g>
                    </svg>
                    {{ description }}
                </Tooltip.Content>
            </transition>
        </Tooltip.Positioner>
    </Tooltip.Root>

</template>

<script lang="ts" setup>
import { Tooltip } from "@ark-ui/vue";

const props = defineProps<{
    name: string;
    description?: string | null;
    icon?: string | null;
    img?: string | null;
    verified?: boolean;
}>();

const open = ref(false);
</script>