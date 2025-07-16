<script setup lang="ts">
import {
    InfoIcon,
    PaletteIcon,
    SettingsIcon,
    ShieldCheckIcon,
    SmileIcon,
    TerminalSquareIcon,
    UserIcon,
} from "lucide-vue-next";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import pkg from "~~/package.json";
import Avatar from "../profiles/avatar.vue";
import TinyCard from "../profiles/tiny-card.vue";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Category from "./category.vue";
import Developer from "./developer.vue";
import Emojis from "./emojis/index.vue";
import Page from "./page.vue";
import { preferences } from "./preferences";
import Profile from "./profile.vue";
import Stats from "./stats.vue";

const pages = Object.values(preferences)
    .map((p) => p.options.category)
    .filter((c) => c !== undefined)
    .map((c) => c.split("/")[0] as string)
    .concat(["Account", "Emojis", "Developer", "About"])
    // Remove duplicates
    .filter((c, i, a) => a.indexOf(c) === i);
const extraPages = ["Account", "Emojis", "Developer", "About"];

const icons: Record<string, Component> = {
    Account: UserIcon,
    Appearance: PaletteIcon,
    Emojis: SmileIcon,
    Behaviour: SettingsIcon,
    Roles: ShieldCheckIcon,
    Developer: TerminalSquareIcon,
    About: InfoIcon,
};

// For each page, map the associated categories
const categories = Object.fromEntries(
    pages.map((page) => {
        const categories = Object.values(preferences)
            .map((p) => p.options.category)
            .filter((c) => c !== undefined)
            .filter((c) => c.split("/")[0] === page)
            .map((c) => c.split("/")[1] as string)
            // Remove duplicates
            .filter((c, i, a) => a.indexOf(c) === i);

        return [page, categories];
    }),
);

const { account: author1 } = useAccountFromAcct(
    client,
    "jessew@vs.cpluspatch.com",
);

const { account: author2 } = useAccountFromAcct(
    client,
    "aprl@social.lysand.org",
);

const { account: author3 } = useAccountFromAcct(
    client,
    "lina@social.lysand.org",
);

const { account: author4 } = useAccountFromAcct(client, "nyx@v.everypizza.im");

const open = ref(false);

useListen("preferences:open", () => {
    open.value = true;
});
</script>

<template>
    <Dialog v-model:open="open" v-if="identity">
        <DialogContent class="md:max-w-5xl w-full h-full p-0 md:max-h-[70dvh] overflow-hidden">
            <Tabs class="md:grid-cols-[auto_minmax(0,1fr)] !grid gap-2 *:p-4 overflow-hidden *:overflow-y-auto *:h-full" orientation="vertical"
                :default-value="pages[0]">
                <DialogHeader class="gap-6 grid grid-rows-[auto_minmax(0,1fr)] border-b md:border-b-0 md:border-r min-w-60 text-left">
                    <div class="grid gap-3 items-center grid-cols-[auto_minmax(0,1fr)]">
                        <Avatar :name="identity.account.display_name || identity.account.username"
                            :src="identity.account.avatar" />
                        <DialogTitle>Preferences</DialogTitle>
                    </div>
                    <DialogDescription class="sr-only">
                        Make changes to your preferences here.
                    </DialogDescription>
                    <TabsList class="md:grid md:grid-cols-1 w-full h-fit *:justify-start !justify-start">
                        <TabsTrigger v-for="page in pages" :key="page" :value="page">
                            <component :is="icons[page]" class="size-4 mr-2" />
                            {{ page }}
                        </TabsTrigger>
                    </TabsList>
                </DialogHeader>
                <TabsContent v-for="page in pages.filter(p => !extraPages.includes(p))" :key="page" :value="page"
                    as-child>
                    <Page :title="page">
                        <Category v-for="category in categories[page]" :key="category"
                            :preferences="Object.entries(preferences).filter(([, p]) => p.options.category === `${page}/${category}`).map(([k,]) => k as keyof typeof preferences)"
                            :name="category" />
                    </Page>
                </TabsContent>
                <TabsContent value="Emojis" as-child>
                    <Page title="Emojis">
                        <Emojis />
                    </Page>
                </TabsContent>
                <TabsContent value="Account" as-child>
                    <Page title="Account">
                        <Profile />
                    </Page>
                </TabsContent>
                <TabsContent value="Developer" as-child>
                    <Page title="Developer">
                        <Developer />
                    </Page>
                </TabsContent>
                <TabsContent value="About" as-child>
                    <Page title="About">
                        <section class="space-y-4">
                            <p class="leading-7 text-sm max-w-xl">
                                {{ pkg.description }}
                            </p>

                            <Stats />
                        </section>
                        <Separator />
                        <section class="space-y-2">
                            <h3 class="text-lg font-semibold tracking-tight">Developers</h3>
                            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                <TinyCard v-if="author1" :account="author1" domain="vs.cpluspatch.com" />
                                <TinyCard v-if="author2" :account="author2" domain="social.lysand.org" />
                                <TinyCard v-if="author3" :account="author3" domain="social.lysand.org" />
                                <TinyCard v-if="author4" :account="author4" domain="v.everypizza.im" />
                            </div>
                        </section>
                        <Separator />
                        <section class="space-y-2">
                            <h3 class="text-lg font-semibold tracking-tight">Dependencies</h3>
                            <ul class="grid lg:grid-cols-2 gap-2 grid-cols-1 items-center justify-center list-disc ml-6">
                                <li v-for="[dep, version] in Object.entries(pkg.dependencies)" :key="dep">
                                    <code
                                        class="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">
                                        {{ dep }}@{{ version }}
                                    </code>
                                </li>
                            </ul>
                        </section>
                    </Page>
                </TabsContent>
            </Tabs>
        </DialogContent>
    </Dialog>
</template>
