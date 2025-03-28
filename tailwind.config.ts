import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

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
                warning: {
                    DEFAULT: "hsl(var(--warning))",
                    foreground: "hsl(var(--warning-foreground))",
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
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                DEFAULT: "var(--radius)",
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
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--reka-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--reka-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
                "collapsible-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--reka-collapsible-content-height)",
                    },
                },
                "collapsible-up": {
                    from: {
                        height: "var(--reka-collapsible-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
        },
    },
    plugins: [forms, typography, animate],
    content: ["packages/**/*.{vue,js,ts}"],
});
