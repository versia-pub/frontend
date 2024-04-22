import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default (<Partial<Config>>{
    theme: {
        extend: {
            colors: {
                dark: {
                    50: "#4a4a4a",
                    100: "#3c3c3c",
                    200: "#323232",
                    300: "#2d2d2d",
                    400: "#222222",
                    500: "#1f1f1f",
                    600: "#1c1c1e",
                    700: "#1b1b1b",
                    800: "#181818",
                    900: "#0f0f0f",
                    950: "#080808",
                },
            },
        },
    },
    plugins: [forms, typography],
    content: [],
});
