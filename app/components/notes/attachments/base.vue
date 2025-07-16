<template>
    <Dialog>
        <Card class="w-full h-full overflow-hidden relative p-0 *:first:w-full *:first:h-full *:first:object-contain *:first:bg-muted/20">
            <DialogTrigger v-if="lightbox" :as-child="true">
                <slot />
            </DialogTrigger>
            <slot v-else />
            <!-- Alt text viewer -->
            <Popover v-if="attachment.description">
                <div class="absolute top-0 right-0 p-2">
                    <PopoverTrigger :as-child="true">
                        <Button variant="outline" size="icon" title="View alt text">
                            <Captions />
                        </Button>
                    </PopoverTrigger>
                </div>
                <PopoverContent>
                    <p class="text-sm">{{ attachment.description }}</p>
                </PopoverContent>
            </Popover>
        </Card>
        <DialogContent :hide-close="true"
            class="duration-200 bg-transparent border-none overflow-hidden !animate-none gap-6 w-screen h-screen !max-w-none">
            <div class="grid grid-rows-[auto_1fr_auto]">
                <div class="flex flex-row gap-2 w-full">
                    <DialogTitle class="sr-only">{{ attachment.type }}</DialogTitle>
                    <Button as="a" :href="attachment?.url" target="_blank" :download="true" variant="outline" size="icon"
                        class="ml-auto">
                        <Download />
                    </Button>
                    <DialogClose :as-child="true">
                        <Button variant="outline" size="icon">
                            <X />
                        </Button>
                    </DialogClose>
                </div>
                <div class="flex items-center justify-center overflow-hidden *:max-h-[80vh] *:max-w-[80vw] *:w-full *:h-full *:object-contain">
                   <slot />
                </div>
                <DialogDescription class="flex items-center justify-center">
                    <Card v-if="attachment.description" class="max-w-md max-h-48 overflow-auto text-sm">
                        <p>{{ attachment.description }}</p>
                    </Card>
                </DialogDescription>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import type { Attachment } from "@versia/client/schemas";
import { Captions, Download, File, X } from "lucide-vue-next";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";

const { attachment, lightbox = false } = defineProps<{
    attachment: z.infer<typeof Attachment>;
    lightbox?: boolean;
}>();
</script>
