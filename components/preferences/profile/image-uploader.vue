<template>
    <Dialog v-model:open="open">
        <DialogTrigger :as-child="true">
            <Button v-bind="$attrs" variant="ghost" class="h-fit w-fit p-0 m-0 relative group border overflow-hidden">
                <Avatar size="lg" :src="image" :name="displayName" />
                <div
                    class="absolute inset-0 bg-black/80 flex group-hover:opacity-100 opacity-0 duration-200 items-center justify-center">
                    <Upload />
                </div>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>
                Change image
            </DialogTitle>
            <DialogDescription class="sr-only">
                Upload an image, add a Gravatar email or use a URL.
            </DialogDescription>
            <form class="p-4 grid gap-6" @submit="submit">
                <Tabs default-value="upload" class="mt-2 data-[component=tabpanel]:*:mt-6">
                    <TabsList class="w-full *:w-full">
                        <TabsTrigger value="upload">
                            Upload
                        </TabsTrigger>
                        <TabsTrigger value="gravatar">
                            Gravatar
                        </TabsTrigger>
                        <TabsTrigger value="url">
                            URL
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload">
                        <FormField v-slot="{ handleChange, handleBlur }" name="image">
                            <FormItem>
                                <FormLabel class="sr-only">
                                    Upload
                                </FormLabel>
                                <FormControl>
                                    <Input type="file" accept="image/*" @change="handleChange" @blur="handleBlur"
                                        :disabled="isSubmitting" />
                                </FormControl>
                                <FormDescription>
                                    {{ m.lime_late_millipede_urge() }}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </TabsContent>
                    <TabsContent value="gravatar">
                        <FormField v-slot="{ componentField, errors, value }" name="email" @update:model-value="async (value) => {
                            gravatarUrl = await emailToGravatar(value)
                        }">
                            <FormItem>
                                <FormLabel>
                                    Gravatar email
                                </FormLabel>
                                <FormControl>
                                    <Input v-bind="componentField" :disabled="isSubmitting"
                                        placeholder="peter.griffin@fox.com" />
                                </FormControl>
                                <FormMessage />
                                <div v-if="value" class="grid gap-4 !mt-4">
                                    <Label>Preview</Label>
                                    <Avatar size="lg" :src="gravatarUrl" />
                                </div>
                            </FormItem>
                        </FormField>
                    </TabsContent>
                    <TabsContent value="url">
                        <FormField v-slot="{ componentField, errors, value }" name="url">
                            <FormItem>
                                <FormLabel>
                                    URL
                                </FormLabel>
                                <FormControl>
                                    <Input v-bind="componentField" :disabled="isSubmitting"
                                        placeholder="https://mysite.com/avar.webp" />
                                </FormControl>
                                <FormMessage />
                                <div v-if="value" class="grid gap-4 !mt-4">
                                    <Label>Preview</Label>
                                    <Avatar size="lg" :src="value" />
                                </div>
                            </FormItem>
                        </FormField>
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    <DialogClose :as-child="true">
                        <Button variant="outline" :disabled="isSubmitting">
                            {{ m.soft_bold_ant_attend() }}
                        </Button>
                    </DialogClose>
                    <Button type="submit" variant="default" :disabled="isSubmitting">
                        {{ m.teary_antsy_panda_aid() }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { Upload } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { z } from "zod";
import Avatar from "~/components/profiles/avatar.vue";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "~/components/ui/dialog";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import * as m from "~/paraglide/messages.js";

const { maxSize } = defineProps<{
    displayName?: string;
    maxSize?: number;
}>();

const image = defineModel<string>("image", {
    required: true,
});

const emit = defineEmits<{
    submitFile: [file: File];
    submitUrl: [url: string];
}>();

const schema = toTypedSchema(
    z
        .object({
            image: z
                .instanceof(File, {
                    message: m.sound_topical_gopher_offer(),
                })
                .refine(
                    (v) => v.size <= (maxSize ?? Number.MAX_SAFE_INTEGER),
                    m.zippy_caring_raven_edit({
                        size: maxSize ?? Number.MAX_SAFE_INTEGER,
                    }),
                ),
        })
        .or(
            z.object({
                url: z.string().url(),
            }),
        )
        .or(
            z.object({
                email: z.string().email(),
            }),
        ),
);

const emailToGravatar = async (email: string) => {
    const sha256 = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(email),
    );

    return `https://www.gravatar.com/avatar/${Array.from(new Uint8Array(sha256))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")}?size=512`;
};

const open = ref(false);
const gravatarUrl = ref<string | undefined>(undefined);

const { handleSubmit, isSubmitting, values } = useForm({
    validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
    if ((values as { image: File }).image) {
        emit("submitFile", (values as { image: File }).image);
    } else if ((values as { url: string }).url) {
        emit("submitUrl", (values as { url: string }).url);
    } else if ((values as { email: string }).email) {
        emit(
            "submitUrl",
            await emailToGravatar((values as { email: string }).email),
        );
    }

    open.value = false;
});
</script>
