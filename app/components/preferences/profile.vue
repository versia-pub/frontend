<template>
    <form v-if="identity" class="grid gap-6" @submit="save">
        <Transition name="slide-up">
            <Alert v-if="dirty" layout="button" class="absolute bottom-2 z-10 inset-x-2 w-[calc(100%-1rem)]">
                <SaveOff class="size-4" />
                <AlertTitle>Unsaved changes</AlertTitle>
                <AlertDescription>
                    Click "apply" to save your changes.
                </AlertDescription>
                <Button variant="secondary" class="w-full" typ="submit" :disabled="submitting">Apply</Button>
            </Alert>
        </Transition>

        <FormField v-slot="{ handleChange, handleBlur }" name="banner">
            <TextInput :title="m.bright_late_osprey_renew()" :description="m.great_level_lamb_sway()">
                <Input type="file" accept="image/*" @change="handleChange" @blur="handleBlur" />
            </TextInput>
        </FormField>

        <FormField v-slot="{ setValue }" name="avatar">
            <TextInput :title="m.safe_icy_bulldog_quell()">
                <ImageUploader v-model:image="identity.account.avatar" @submit-file="(file) => setValue(file)"
                    @submit-url="(url) => setValue(url)" />
            </TextInput>
        </FormField>

        <FormField v-slot="{ componentField }" name="name">
            <TextInput :title="m.mild_known_mallard_jolt()" :description="m.lime_dry_skunk_loop()">
                <Input v-bind="componentField" />
            </TextInput>
        </FormField>

        <FormField v-slot="{ componentField }" name="username">
            <TextInput :title="m.neat_silly_dog_prosper()" :description="m.petty_plane_tadpole_earn()">
                <Input v-bind="componentField" />
            </TextInput>
        </FormField>

        <FormField v-slot="{ componentField }" name="bio">
            <TextInput :title="m.next_caring_ladybug_hack()" :description="m.stale_just_anaconda_earn()">
                <Textarea rows="10" v-bind="componentField" />
            </TextInput>
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="fields">
            <Fields :title="m.aqua_mealy_toucan_pride()" :value="value" @update:value="handleChange" />
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="bot" as-child>
            <SwitchInput :title="m.gaudy_each_opossum_play()" :description="m.grassy_acidic_gadfly_cure()">
                <Switch :model-value="value" @update:model-value="handleChange" />
            </SwitchInput>
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="locked" as-child>
            <SwitchInput :title="m.dirty_moving_shark_emerge()" :description="m.bright_fun_mouse_boil()">
                <Switch :model-value="value" @update:model-value="handleChange" />
            </SwitchInput>
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="discoverable" as-child>
            <SwitchInput :title="m.red_vivid_cuckoo_spark()" :description="m.plain_zany_donkey_dart()">
                <Switch :model-value="value" @update:model-value="handleChange" />
            </SwitchInput>
        </FormField>
    </form>
</template>

<script lang="ts" setup>
import { SaveOff } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import SwitchInput from "~/components/form/switch.vue";
import TextInput from "~/components/form/text.vue";
import * as m from "~~/paraglide/messages.js";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { formSchema } from "./profile";
import Fields from "./profile/fields.vue";
import ImageUploader from "./profile/image-uploader.vue";

const dirty = computed(() => form.meta.value.dirty);
const submitting = ref(false);

if (!identity.value) {
    throw new Error("Identity not found.");
}

const account = computed(() => identity.value?.account as Identity["account"]);
const schema = formSchema(identity.value);

const form = useForm({
    validationSchema: schema,
    initialValues: {
        bio: account.value.source?.note ?? "",
        bot: account.value.bot ?? false,
        locked: account.value.locked ?? false,
        discoverable: account.value.discoverable ?? true,
        username: account.value.username,
        name: account.value.display_name,
        fields:
            account.value.source?.fields.map((f) => ({
                name: f.name,
                value: f.value,
            })) ?? [],
    },
});

const save = form.handleSubmit(async (values) => {
    if (submitting.value) {
        return;
    }

    submitting.value = true;
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

        form.resetForm({
            values: {
                ...form.values,
                ...values,
            },
        });
    } catch (e) {
        toast.dismiss(id);
    }

    submitting.value = false;
});
</script>
