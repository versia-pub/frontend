<template>
    <Dialog v-model:open="open">
        <DialogTrigger>
            <slot />
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>
                {{ m.whole_icy_puffin_smile() }}
            </DialogTitle>
            <DialogDescription class="sr-only">
                {{ m.frail_great_marten_pet() }}
            </DialogDescription>
            <form class="p-4 grid gap-6" @submit="submit">
                <div v-if="values.image" class="flex items-center justify-around *:size-20 *:p-2 *:rounded *:border *:shadow">
                    <div class="bg-background">
                        <img class="h-full object-cover" :src="createObjectURL(values.image as File)" :alt="values.alt" />
                    </div>
                    <div class="bg-zinc-700">
                        <img class="h-full object-cover" :src="createObjectURL(values.image as File)" :alt="values.alt" />
                    </div>
                    <div class="bg-zinc-400">
                        <img class="h-full object-cover" :src="createObjectURL(values.image as File)" :alt="values.alt" />
                    </div>
                    <div class="bg-foreground">
                        <img class="h-full object-cover" :src="createObjectURL(values.image as File)" :alt="values.alt" />
                    </div>
                </div>

                <FormField v-slot="{ handleChange, handleBlur }" name="image">
                    <FormItem>
                        <FormLabel>
                            {{ m.active_direct_bear_compose() }}
                        </FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/*" @change="(e: any) => {
                                handleChange(e);

                                if (!values.shortcode) {
                                    setFieldValue('shortcode', e.target.files[0].name.replace(/\.[^/.]+$/, ''));
                                }
                            }" @blur="handleBlur" :disabled="isSubmitting" />
                        </FormControl>
                        <FormDescription>
                            {{ m.lime_late_millipede_urge() }}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="shortcode">
                    <FormItem>
                        <FormLabel>
                            {{ m.happy_mild_fox_gleam() }}
                        </FormLabel>
                        <FormControl>
                            <Input v-bind="componentField" :disabled="isSubmitting" />
                        </FormControl>
                        <FormDescription>
                            {{ m.glad_day_kestrel_amaze() }}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="category">
                    <FormItem>
                        <FormLabel>
                            {{ m.short_cute_jackdaw_comfort() }}
                        </FormLabel>
                        <FormControl>
                            <Input v-bind="componentField" :disabled="isSubmitting" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="alt">
                    <FormItem>
                        <FormLabel>
                            {{ m.watery_left_shrimp_bless() }}
                        </FormLabel>
                        <FormControl>
                            <Textarea rows="2" v-bind="componentField" :disabled="isSubmitting" />
                        </FormControl>
                        <FormDescription>
                            {{ m.weird_fun_jurgen_arise() }}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField, value, handleChange }" v-if="hasEmojiAdmin" name="global"
                    :as="Card">
                    <FormItem class="grid grid-cols-[1fr,auto] items-center p-6 gap-2">
                        <CardHeader class="space-y-0.5 p-0">
                            <FormLabel :as="CardTitle">
                                {{ m.pink_sharp_carp_work() }}
                            </FormLabel>
                            <CardDescription>
                                {{ m.dark_pretty_hyena_link() }}
                            </CardDescription>
                        </CardHeader>
                        <FormControl>
                            <Switch :checked="value" @update:checked="handleChange" v-bind="componentField" :disabled="isSubmitting" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <DialogFooter>
                    <DialogClose :as-child="true">
                        <Button variant="outline" :disabled="isSubmitting">
                            {{ m.soft_bold_ant_attend() }}
                        </Button>
                    </DialogClose>
                    <Button type="submit" variant="default" :disabled="isSubmitting">
                        {{ m.flat_safe_haddock_gaze() }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { RolePermission } from "@versia/client/types";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import * as m from "~/paraglide/messages.js";

const open = ref(false);
const permissions = usePermissions();
const hasEmojiAdmin = permissions.value.includes(RolePermission.ManageEmojis);
const createObjectURL = URL.createObjectURL;

const formSchema = toTypedSchema(
    z.object({
        image: z
            .instanceof(File, {
                message: m.sound_topical_gopher_offer(),
            })
            .refine(
                (v) =>
                    v.size <=
                    // @ts-expect-error Types aren't updated with this new value yet
                    (identity.value?.instance.configuration.emojis
                        .emoji_size_limit ?? 0),
                m.orange_weird_parakeet_hug({
                    // @ts-expect-error Types aren't updated with this new value yet
                    count: identity.value?.instance.configuration.emojis
                        .emoji_size_limit,
                }),
            ),
        shortcode: z
            .string()
            .min(1)
            .max(
                // @ts-expect-error Types aren't updated with this new value yet
                identity.value?.instance.configuration.emojis
                    .max_emoji_shortcode_characters,
                m.solid_inclusive_owl_hug({
                    // @ts-expect-error Types aren't updated with this new value yet
                    count: identity.value?.instance.configuration.emojis
                        .max_emoji_shortcode_characters,
                }),
            )
            .regex(emojiValidator),
        global: z.boolean().default(false),
        category: z
            .string()
            .max(
                64,
                m.home_cool_orangutan_hug({
                    count: 64,
                }),
            )
            .optional(),
        alt: z
            .string()
            .max(
                // @ts-expect-error Types aren't updated with this new value yet
                identity.value?.instance.configuration.emojis
                    .max_emoji_description_characters,
                m.key_ago_hound_emerge({
                    // @ts-expect-error Types aren't updated with this new value yet
                    count: identity.value?.instance.configuration.emojis
                        .max_emoji_description_characters,
                }),
            )
            .optional(),
    }),
);
const { isSubmitting, handleSubmit, values, setFieldValue } = useForm({
    validationSchema: formSchema,
});

const submit = handleSubmit(async (values) => {
    if (!identity.value) {
        return;
    }

    const id = toast.loading(m.factual_gray_mouse_believe());

    try {
        const { data } = await client.value.uploadEmoji(
            values.shortcode,
            values.image,
            {
                alt: values.alt,
                category: values.category,
                global: values.global,
            },
        );

        toast.dismiss(id);
        toast.success(m.cool_trite_gull_quiz());

        identity.value.emojis = [...identity.value.emojis, data];
        open.value = false;
    } catch {
        toast.dismiss(id);
    }
});
</script>