<template>
    <Dialog>
        <Card class="w-full h-full overflow-hidden relative">
            <DialogTrigger v-if="attachment.type === 'image'" :as-child="true">
                <img :src="attachment.url" :alt="attachment.description ?? undefined"
                    class="w-full h-full object-contain bg-muted/20" />
            </DialogTrigger>
            <video v-else-if="attachment.type === 'video' || attachment.type === 'gifv'" :src="attachment.url"
                :alt="attachment.description ?? undefined" class="w-full h-full object-cover bg-muted/20" controls />
            <audio v-else-if="attachment.type === 'audio'" :src="attachment.url"
                :alt="attachment.description ?? undefined" class="w-full h-full object-cover bg-muted/20" controls />
            <DialogTrigger v-else :as-child="true">
                <div class="w-full h-full flex flex-col items-center justify-center bg-muted/20">
                    <File class="size-12" />
                    <span class="text-sm"></span>
                </div>
            </DialogTrigger>
            <!-- Alt text viewer -->
            <Popover v-if="attachment.description">
                <div class="absolute top-0 right-0 p-2">
                    <PopoverTrigger :as-child="true">
                        <Button variant="outline" size="icon" class="[&_svg]:size-6" title="View alt text">
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
            class="fixed inset-0 z-50 w-screen h-screen p-6 duration-200 bg-transparent border-none grid grid-rows-[auto,1fr,auto] overflow-hidden translate-x-0 translate-y-0 max-w-full !animate-none gap-6">
            <div class="flex flex-row gap-2 w-full">
                <DialogTitle class="sr-only">{{ attachment.type }}</DialogTitle>
                <Button as="a" :href="attachment?.url" target="_blank" :download="true" variant="ghost" size="icon"
                    class="[&_svg]:size-6  ml-auto">
                    <Download />
                </Button>
                <DialogClose :as-child="true">
                    <Button variant="ghost" size="icon" class="[&_svg]:size-6">
                        <X />
                    </Button>
                </DialogClose>
            </div>
            <div class="flex items-center justify-center overflow-hidden *:max-h-[80vh] *:max-w-[80vh]">
                <img v-if="attachment.type === 'image'" :src="attachment.url" :alt="attachment.description ?? ''"
                    class="object-contain" />
                <video v-else-if="attachment.type === 'video' || attachment.type === 'gifv'" :src="attachment.url"
                    :alt="attachment.description ?? ''" class="object-cover" controls />
                <audio v-else-if="attachment.type === 'audio'" :src="attachment.url" :alt="attachment.description ?? ''"
                    class="object-cover" controls />
                <div v-else class="flex flex-col items-center justify-center">
                    <File class="size-12" />
                    <span class="text-sm"></span>
                </div>
            </div>
            <DialogDescription class="flex items-center justify-center">
                <Card v-if="attachment.description" class="p-4 max-w-md max-h-48 overflow-auto">
                    <p class="text-sm">{{ attachment.description }}</p>
                </Card>
            </DialogDescription>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import type { Attachment } from "@versia/client/types";
import { Captions, Download, File, X } from "lucide-vue-next";
import { Card } from "~/components/ui/card";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

defineProps<{
    attachment: Attachment;
}>();
</script>