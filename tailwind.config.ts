import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const themeVariables = (color: string) => ({
    50: `var(--theme-${color}-50)`,
    100: `var(--theme-${color}-100)`,
    200: `var(--theme-${color}-200)`,
    300: `var(--theme-${color}-300)`,
    400: `var(--theme-${color}-400)`,
    500: `var(--theme-${color}-500)`,
    600: `var(--theme-${color}-600)`,
    700: `var(--theme-${color}-700)`,
    800: `var(--theme-${color}-800)`,
    900: `var(--theme-${color}-900)`,
    950: `var(--theme-${color}-950)`,
});

export default (<Config>{
    theme: {
        extend: {
            colors: {
                dark: themeVariables("dark"),
                primary: themeVariables("primary"),
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
