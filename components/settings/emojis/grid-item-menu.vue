<template>
    <AdaptiveDropdown>
        <template #button>
            <Button theme="outline">
                <iconify-icon width="none" icon="tabler:dots" class="size-5 text-gray-200"
                    aria-hidden="true" />
                <span class="sr-only">Open menu</span>
            </Button>
        </template>

        <template #items>
            <Menu.ItemGroup>
                <Menu.Item value="">
                    <ButtonDropdown icon="tabler:trash" class="w-full">
                        Delete
                    </ButtonDropdown>
                </Menu.Item>
            </Menu.ItemGroup>
        </template>
    </AdaptiveDropdown>
</template>

<script lang="ts" setup>
import { Menu } from "@ark-ui/vue";
import type { Emoji } from "@versia/client/types";
import ButtonDropdown from "~/components/buttons/button-dropdown.vue";
import AdaptiveDropdown from "~/components/dropdowns/AdaptiveDropdown.vue";
import Button from "~/packages/ui/components/buttons/button.vue";

defineProps<{
    emoji: Emoji;
}>();
</script>