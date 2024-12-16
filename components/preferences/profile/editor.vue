<template>
    <Card v-if="identity" class="w-full max-h-full overflow-auto">
        <form class="p-4 grid gap-6" ref="formRef" @submit="handleSubmit">
            <FormField v-slot="{ handleChange, handleBlur }" name="banner">
                <FormItem>
                    <FormLabel>
                        {{ m.bright_late_osprey_renew() }}
                    </FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" @change="handleChange" @blur="handleBlur" />
                    </FormControl>
                    <FormDescription>
                        {{ m.great_level_lamb_sway() }}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ setValue }" name="avatar">
                <FormItem class="grid gap-1">
                    <FormLabel>
                        {{ m.safe_icy_bulldog_quell() }}
                    </FormLabel>
                    <FormControl>
                        <ImageUploader v-model:image="identity.account.avatar" @submit-file="file => setValue(file)" @submit-url="url => setValue(url)" />
                    </FormControl>
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>
                        {{ m.mild_known_mallard_jolt() }}
                    </FormLabel>
                    <FormControl>
                        <Input v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        {{ m.lime_dry_skunk_loop() }}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="username">
                <FormItem>
                    <FormLabel>
                        {{ m.neat_silly_dog_prosper() }}
                    </FormLabel>
                    <FormControl>
                        <Input v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        {{ m.petty_plane_tadpole_earn() }}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="bio">
                <FormItem>
                    <FormLabel>
                        {{ m.next_caring_ladybug_hack() }}
                    </FormLabel>
                    <FormControl>
                        <Textarea rows="10" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        {{ m.stale_just_anaconda_earn() }}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" name="fields">
                <FormItem>
                    <FormLabel>
                        {{ m.aqua_mealy_toucan_pride() }}
                    </FormLabel>
                    <FormControl>
                        <div class="grid gap-4">
                            <div v-for="(field, index) in value" :key="index"
                                class="grid items-center grid-cols-[auto,repeat(3,minmax(0,1fr))] gap-2">
                                <Button variant="destructive" size="icon"
                                    @click="handleChange([...value.slice(0, index), ...value.slice(index + 1)])">
                                    <Trash />
                                </Button>
                                <Input v-model="field.name" placeholder="Name" @update:model-value="e => {
                                    handleChange([...value.slice(0, index), { name: e, value: field.value }, ...value.slice(index + 1)]);
                                }" />
                                <Input v-model="field.value" placeholder="Value" class="col-span-2" @update:model-value="e => {
                                    handleChange([...value.slice(0, index), { name: field.name, value: e }, ...value.slice(index + 1)]);
                                }" />
                            </div>
                            <Button type="button" variant="secondary"
                                @click="handleChange([...value, { name: '', value: '' }])">
                                {{ m.front_north_eel_gulp() }}
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField, value, handleChange }" name="bot" :as="Card">
                <FormItem class="grid grid-cols-[1fr,auto] items-center p-6 gap-2">
                    <CardHeader class="space-y-0.5 p-0">
                        <FormLabel :as="CardTitle">
                            {{ m.gaudy_each_opossum_play() }}
                        </FormLabel>
                        <CardDescription>
                            {{ m.grassy_acidic_gadfly_cure() }}
                        </CardDescription>
                    </CardHeader>
                    <FormControl>
                        <Switch :checked="value" @update:checked="handleChange" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField, value, handleChange }" name="locked" :as="Card">
                <FormItem class="grid grid-cols-[1fr,auto] items-center p-6 gap-2">
                    <CardHeader class="space-y-0.5 p-0">
                        <FormLabel :as="CardTitle">
                            {{ m.dirty_moving_shark_emerge() }}
                        </FormLabel>
                        <CardDescription>
                            {{ m.bright_fun_mouse_boil() }}
                        </CardDescription>
                    </CardHeader>
                    <FormControl>
                        <Switch :checked="value" @update:checked="handleChange" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField, value, handleChange }" name="discoverable" :as="Card">
                <FormItem class="grid grid-cols-[1fr,auto] items-center p-6 gap-2">
                    <CardHeader class="space-y-0.5 p-0">
                        <FormLabel :as="CardTitle">
                            {{ m.red_vivid_cuckoo_spark() }}
                        </FormLabel>
                        <CardDescription>
                            {{ m.plain_zany_donkey_dart() }}
                        </CardDescription>
                    </CardHeader>
                    <FormControl>
                        <Switch :checked="value" @update:checked="handleChange" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </form>
    </Card>
    <Profile :account="account" class="max-w-lg overflow-auto hidden xl:block" />
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import type { ResponseError } from "@versia/client";
import { Trash } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";
import Profile from "~/components/profiles/profile.vue";
import { Button } from "~/components/ui/button";
import { Card, CardTitle } from "~/components/ui/card";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import * as m from "~/paraglide/messages.js";
import ImageUploader from "./image-uploader.vue";

if (!identity.value) {
    throw new Error("Identity not found.");
}

const account = ref(identity.value.account);

const formSchema = toTypedSchema(
    z.object({
        banner: z
            .instanceof(File)
            .refine(
                (v) =>
                    v.size <=
                    (identity.value?.instance.configuration.accounts
                        .header_size_limit ?? 0),
                m.civil_icy_ant_mend({
                    size: identity.value?.instance.configuration.accounts
                        .header_size_limit,
                }),
            )
            .optional(),
        avatar: z
            .instanceof(File)
            .refine(
                (v) =>
                    v.size <=
                    (identity.value?.instance.configuration.accounts
                        .avatar_size_limit ?? 0),
                m.zippy_caring_raven_edit({
                    size: identity.value?.instance.configuration.accounts
                        .avatar_size_limit,
                }),
            )
            .or(z.string().url())
            .optional(),
        name: z
            .string()
            .max(
                identity.value.instance.configuration.accounts
                    .max_displayname_characters,
            ),
        username: z
            .string()
            .regex(/^[a-z0-9_-]+$/, m.still_upper_otter_dine())
            .max(
                identity.value.instance.configuration.accounts
                    .max_username_characters,
            ),
        bio: z
            .string()
            .max(
                identity.value.instance.configuration.accounts
                    .max_note_characters,
            ),
        bot: z.boolean(),
        locked: z.boolean(),
        discoverable: z.boolean(),
        fields: z.array(z.object({ name: z.string(), value: z.string() })),
    }),
);

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        bio: account.value.source?.note ?? "",
        bot: account.value.bot ?? false,
        locked: account.value.locked ?? false,
        discoverable: account.value.discoverable ?? true,
        username: account.value.username,
        name: account.value.display_name,
        fields: account.value.source?.fields ?? [],
    },
});

const handleSubmit = form.handleSubmit(async (values) => {
    const id = toast.loading(m.jolly_noble_sloth_breathe());

    const changedData = {
        display_name:
            values.name === account.value.display_name
                ? undefined
                : values.name,
        username:
            values.username === account.value.username
                ? undefined
                : values.username,
        note:
            values.bio === account.value.source?.note ? undefined : values.bio,
        bot: values.bot === account.value.bot ? undefined : values.bot,
        locked:
            values.locked === account.value.locked ? undefined : values.locked,
        discoverable:
            values.discoverable === account.value.discoverable
                ? undefined
                : values.discoverable,
        // Can't compare two arrays directly in JS, so we need to check if all fields are the same
        fields_attributes: values.fields.every((field) =>
            account.value.source?.fields?.some(
                (f) => f.name === field.name && f.value === field.value,
            ),
        )
            ? undefined
            : values.fields,
        header: values.banner ? values.banner : undefined,
        avatar: values.avatar ? values.avatar : undefined,
    };

    if (
        Object.values(changedData).filter((v) => v !== undefined).length === 0
    ) {
        toast.dismiss(id);
        toast.error(m.tough_alive_niklas_promise());
        return;
    }

    try {
        const { data } = await client.value.updateCredentials(
            Object.fromEntries(
                Object.entries(changedData).filter(([, v]) => v !== undefined),
            ),
        );

        toast.dismiss(id);
        toast.success(m.spry_honest_kestrel_arrive());

        if (identity.value) {
            identity.value.account = data;
        }

        account.value = data;
    } catch (e) {
        const error = e as ResponseError<{ error: string }>;

        toast.dismiss(id);
    }
});

const formRef = ref<HTMLFormElement | null>(null);

defineExpose({
    submitForm: () => handleSubmit(),
    dirty: computed(() => form.meta.value.dirty),
});
</script>
