import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

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
    darkMode: "class",
    safelist: ["dark"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                dark: themeVariables("dark"),
                /* primary: themeVariables("primary"), */
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                like: "like 1s ease-in-out",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "collapsible-down": "collapsible-down 0.2s ease-in-out",
                "collapsible-up": "collapsible-up 0.2s ease-in-out",
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
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "collapsible-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-collapsible-content-height)" },
                },
                "collapsible-up": {
                    from: { height: "var(--radix-collapsible-content-height)" },
                    to: { height: "0" },
                },
            },
        },
    },
    plugins: [forms, typography, animate],
    content: ["packages/**/*.{vue,js,ts}"],
});
