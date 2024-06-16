import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const dark = {
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
};

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default (<Partial<Config>>{
    theme: {
        extend: {
            colors: {
                dark,
                primary: colors.pink,
            },
            animation: {
                like: "like 1s ease-in-out",
            },
            keyframes: {
                like: {
                    "0%": {
                        transform: "scale(1)",
                    },
                    "50%": {
                        transform: "scale(1.3) rotate(45deg)",
                    },
                    "100%": {
                        transform: "scale(1) rotate(360deg)",
                    },
                },
            },
        },
    },
    plugins: [forms, typography],
    content: [],
});
