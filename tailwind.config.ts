import type {Config} from "tailwindcss";

export default {
    content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                theme: {
                    400: "#361d6b",
                    500: "#A175FF",
                    600: "#d3c5fc",
                    700: "#3D3D5D",
                    800: "#23232E",
                },
                secondary: {
                    500: "#D0ABFF",
                },
            },
            fontFamily: {
                sans: [
                    '"Inter"',
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
        },
    },
    plugins: [],
    // safelist: [
    //     {
    //         pattern: /^bg-/,
    //     },
    //     {
    //         pattern: /^text-/,
    //     },
    //     {
    //         pattern: /^border/,
    //     },
    //     {
    //         pattern: /^ring-/,
    //     }
    // ]
} satisfies Config;
