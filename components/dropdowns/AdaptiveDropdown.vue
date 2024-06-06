<template>
    <Menu.Root :positioning="{
        strategy: 'fixed',
    }" @update:open="(o) => open = o" :open="open">
        <Menu.Trigger>
            <slot name="button"></slot>
        </Menu.Trigger>

        <Teleport to="body">
            <div @mousedown="open = false" @touchstart="open = false" v-if="open"
                class="fixed inset-0 z-10 bg-black/50">
            </div>
            <Menu.Positioner :class="isSmallScreen && '!bottom-0 !top-[unset] fixed inset-x-0 w-full !translate-y-0'">
                <transition enter-active-class="transition ease-in duration-100"
                    enter-from-class="transform opacity-0 translate-y-full sm:translate-y-0 scale-95"
                    enter-to-class="transform translate-y-0 opacity-100 scale-100"
                    leave-active-class="transition ease-out duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <Menu.Content v-if="open"
                        :class="['z-20 mt-2 rounded overflow-hidden p-1 space-y-1 bg-dark-700 shadow-lg ring-1 ring-white/10 focus:outline-none min-w-56', id]">
                        <div v-if="isSmallScreen" class="w-full py-2">
                            <div class="rounded-full h-1 bg-gray-400 w-12 mx-auto"></div>
                        </div>
                        <slot name="items"></slot>
                    </Menu.Content>
                </transition>
            </Menu.Positioner>
        </Teleport>
    </Menu.Root>
</template>

<script setup lang="ts">
import { Menu } from "@ark-ui/vue";
const { width } = useWindowSize();
const isSmallScreen = computed(() => width.value < 768);

const open = ref(false);
const id = useId();

// HACK: Fix the menu children not reacting to touch events as click for some reason
const registerClickHandlers = () => {
    const targetElement = document.querySelector(`.${id}`);
    if (targetElement) {
        for (const el of targetElement.children) {
            el.addEventListener("touchstart", (e) => {
                e.stopPropagation();
                e.preventDefault();
                // Click all element children
                for (const elChild of Array.from(el.children)) {
                    if (elChild instanceof HTMLElement) {
                        elChild.click();
                    }
                }
            });
        }
    }
};

// When opening, register click handlers
watch(open, async (o) => {
    if (o) {
        await nextTick();
        registerClickHandlers();
    }
});
</script>