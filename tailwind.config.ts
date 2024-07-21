import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const themeVariables = (color: string) =>
    Object.fromEntries(
        [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].flatMap((n) => [
            [n, `hsl(var(--theme-${color}-${n}) / <alpha-value>)`],
        ]),
    );

export default (<Config>{
    theme: {
        extend: {
            colors: {
                background: themeVariables("background"),
                primary: themeVariables("primary"),
                text: themeVariables("text"),
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
    content: ["packages/**/*.{vue,js,ts}"],
});
