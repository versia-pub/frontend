<script setup lang="ts">
import { Moon, Sun, Wrench } from "lucide-vue-next";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const colorMode = useColorMode();

const themeNames = {
    light: "Light",
    dark: "Dark",
    system: "System",
} as Record<string, string>;
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline" class="w-full justify-start">
                <Sun class="size-[1.2rem] scale-100 transition-all dark:scale-0 dark:hidden inline" />
                <Moon class="size-[1.2rem] scale-0 transition-all dark:scale-100 hidden dark:inline" />
                {{ themeNames[colorMode.preference] }}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" >
            <DropdownMenuItem @click="colorMode.preference = 'light'">
                <Sun class="size-4 mr-2" />
                Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'dark'">
                <Moon class="size-4 mr-2" />
                Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'system'">
                <Wrench class="size-4 mr-2" />
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>