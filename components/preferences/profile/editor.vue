<template>
    <Card v-if="identity" class="w-full max-h-full overflow-auto">
        <form class="p-4 grid gap-6" ref="formRef" @submit="handleSubmit">
            <FormField v-slot="{ handleChange, handleBlur }" name="banner">
                <FormItem>
                    <FormLabel>
                        Banner
                    </FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" @change="handleChange" @blur="handleBlur" />
                    </FormControl>
                    <FormDescription>
                        Recommended size: over 1500x500px
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ handleChange, handleBlur }" name="avatar">
                <FormItem>
                    <FormLabel>
                        Avatar
                    </FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" @change="handleChange" @blur="handleBlur" />
                    </FormControl>
                    <FormDescription>
                        Recommended size: 400x400px
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>
                        Display Name
                    </FormLabel>
                    <FormControl>
                        <Input v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Custom emojis can be used here.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="username">
                <FormItem>
                    <FormLabel>
                        Username
                    </FormLabel>
                    <FormControl>
                        <Input v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Changing this will break all links to your profile.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="bio">
                <FormItem>
                    <FormLabel>
                        Bio
                    </FormLabel>
                    <FormControl>
                        <Textarea rows="10" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Markdown and custom emojis are supported.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ value, handleChange }" name="fields">
                <FormItem>
                    <FormLabel>
                        Custom Fields
                    </FormLabel>
                    <FormControl>
                        <div class="grid gap-4">
                            <div v-for="(field, index) in value" :key="index" class="grid items-center grid-cols-[auto,repeat(3,minmax(0,1fr))] gap-2">
                                <Button variant="destructive" size="icon" @click="handleChange([...value.slice(0, index), ...value.slice(index + 1)])">
                                    <Trash />
                                </Button>
                                <Input v-model="field.name" placeholder="Name" @update:model-value="e => {
                                    handleChange([...value.slice(0, index), { name: e, value: field.value }, ...value.slice(index + 1)]);
                                }" />
                                <Input v-model="field.value" placeholder="Value" class="col-span-2" @update:model-value="e => {
                                    handleChange([...value.slice(0, index), { name: field.name, value: e }, ...value.slice(index + 1)]);
                                }" />
                            </div>
                            <Button type="button" variant="secondary" @click="handleChange([...value, { name: '', value: '' }])">
                                Add Field
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
                            Mark account as bot
                        </FormLabel>
                        <CardDescription>
                            Is this account sending automated messages?
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
                            Enable follow requests
                        </FormLabel>
                        <CardDescription>
                            Will require approval for new followers.
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
                            Allow account discovery
                        </FormLabel>
                        <CardDescription>
                            Allow your account to be found in search results.
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
                `Banner must be less than ${identity.value?.instance.configuration.accounts.header_size_limit} bytes`,
            )
            .optional(),
        avatar: z
            .instanceof(File)
            .refine(
                (v) =>
                    v.size <=
                    (identity.value?.instance.configuration.accounts
                        .avatar_size_limit ?? 0),
                `Avatar must be less than ${identity.value?.instance.configuration.accounts.avatar_size_limit} bytes`,
            )
            .optional(),
        name: z
            .string()
            .max(
                identity.value.instance.configuration.accounts
                    .max_displayname_characters,
            ),
        username: z
            .string()
            .regex(
                /^[a-z0-9_-]+$/,
                "Username can only contain lowercase letters, numbers, underscores and hyphens",
            )
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
    const id = toast.loading("Updating profile...");

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
        toast.error("No changes");
        return;
    }

    try {
        const { data } = await client.value.updateCredentials(
            Object.fromEntries(
                Object.entries(changedData).filter(([, v]) => v !== undefined),
            ),
        );

        toast.dismiss(id);
        toast.success("Profile updated");

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