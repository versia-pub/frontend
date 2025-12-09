<template>
    <form class="grid gap-6" @submit="save">
        <Transition name="slide-up">
            <Alert
                v-if="dirty"
                class="absolute bottom-2 z-10 inset-x-2 w-[calc(100%-1rem)] grid-cols-[calc(var(--spacing)*4)_1fr_auto]!"
            >
                <SaveOff class="size-4"/>
                <AlertTitle>Unsaved changes</AlertTitle>
                <Button
                    variant="secondary"
                    class="w-full row-span-2"
                    type="button"
                    :disabled="submitting"
                >
                    Apply
                </Button>
                <AlertDescription>
                    Click "apply" to save your changes.
                </AlertDescription>
            </Alert>
        </Transition>

        <FormField v-slot="{ handleChange, handleBlur }" name="banner">
            <TextInput
                :title="m.bright_late_osprey_renew()"
                :description="m.great_level_lamb_sway()"
            >
                <Input
                    type="file"
                    accept="image/*"
                    @change="handleChange"
                    @blur="handleBlur"
                />
            </TextInput>
        </FormField>

        <FormField v-slot="{ setValue }" name="avatar">
            <TextInput :title="m.safe_icy_bulldog_quell()">
                <ImageUploader
                    v-model:image="authStore.account!.avatar"
                    @submit-file="(file) => setValue(file)"
                    @submit-url="(url) => setValue(url)"
                />
            </TextInput>
        </FormField>

        <FormField v-slot="{ componentField }" name="name">
            <TextInput
                :title="m.mild_known_mallard_jolt()"
                :description="m.lime_dry_skunk_loop()"
            >
                <Input v-bind="componentField"/>
            </TextInput>
        </FormField>

        <FormField v-slot="{ componentField }" name="username">
            <TextInput
                :title="m.neat_silly_dog_prosper()"
                :description="m.petty_plane_tadpole_earn()"
            >
                <Input v-bind="componentField"/>
            </TextInput>
        </FormField>

        <FormField v-slot="{ componentField }" name="bio">
            <TextInput
                :title="m.next_caring_ladybug_hack()"
                :description="m.stale_just_anaconda_earn()"
            >
                <Textarea rows="10" v-bind="componentField"/>
            </TextInput>
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="fields">
            <Fields
                :title="m.aqua_mealy_toucan_pride()"
                :value="value"
                @update:value="handleChange"
            />
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="bot" as-child>
            <SwitchInput
                :title="m.gaudy_each_opossum_play()"
                :description="m.grassy_acidic_gadfly_cure()"
            >
                <Switch
                    :model-value="value"
                    @update:model-value="handleChange"
                />
            </SwitchInput>
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="locked" as-child>
            <SwitchInput
                :title="m.dirty_moving_shark_emerge()"
                :description="m.bright_fun_mouse_boil()"
            >
                <Switch
                    :model-value="value"
                    @update:model-value="handleChange"
                />
            </SwitchInput>
        </FormField>

        <FormField
            v-slot="{ value, handleChange }"
            name="discoverable"
            as-child
        >
            <SwitchInput
                :title="m.red_vivid_cuckoo_spark()"
                :description="m.plain_zany_donkey_dart()"
            >
                <Switch
                    :model-value="value"
                    @update:model-value="handleChange"
                />
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
const authStore = useAuthStore();

if (!(authStore.instance && authStore.account)) {
    throw new Error("Not signed in.");
}

const schema = formSchema(authStore.instance);

const form = useForm({
    validationSchema: schema,
    initialValues: {
        bio: authStore.account.source?.note ?? "",
        bot: authStore.account.bot ?? false,
        locked: authStore.account.locked ?? false,
        discoverable: authStore.account.discoverable ?? true,
        username: authStore.account.username,
        name: authStore.account.display_name,
        fields:
            authStore.account.source?.fields.map((f) => ({
                name: f.name,
                value: f.value,
            })) ?? [],
    },
});

const save = form.handleSubmit(async (values) => {
    if (submitting.value || !authStore.account) {
        return;
    }

    submitting.value = true;
    const id = toast.loading(m.jolly_noble_sloth_breathe());

    const changedData = {
        display_name:
            values.name === authStore.account.display_name
                ? undefined
                : values.name,
        username:
            values.username === authStore.account.username
                ? undefined
                : values.username,
        note:
            values.bio === authStore.account.source?.note
                ? undefined
                : values.bio,
        bot: values.bot === authStore.account.bot ? undefined : values.bot,
        locked:
            values.locked === authStore.account.locked
                ? undefined
                : values.locked,
        discoverable:
            values.discoverable === authStore.account.discoverable
                ? undefined
                : values.discoverable,
        // Can't compare two arrays directly in JS, so we need to check if all fields are the same
        fields_attributes: values.fields.every((field) =>
            authStore.account?.source?.fields?.some(
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
        const { data } = await authStore.client.updateCredentials(
            Object.fromEntries(
                Object.entries(changedData).filter(([, v]) => v !== undefined),
            ),
        );

        toast.dismiss(id);
        toast.success(m.spry_honest_kestrel_arrive());

        authStore.updateActiveIdentity({
            account: data,
        });

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
