import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic aliases
                brand: {
                    DEFAULT: "#563B29", // Earth Main
                    light: "#755340",
                    dark: "#3D2A1D",
                    contrast: "#FFFFFF",
                },
                background: {
                    primary: "#FFFFFF",
                    secondary: "#F5F5F4", // Neutral 100
                    tertiary: "#E8E7E5",  // Neutral 200
                    stone: "#B9B0A3",
                    olive: "#696B54",
                    earth: "#563B29",
                    marble: "#B6B5AF",
                    linen: "#C5C3BD",
                    overlay: "rgba(89, 59, 41, 0.75)",
                },
                text: {
                    primary: "#1C1B1A",
                    secondary: "#504E4A",
                    tertiary: "#6F6D67",
                    quaternary: "#92908A",
                    inverse: "#FFFFFF",
                    onStone: "#2A2621",
                    onOlive: "#FFFFFF",
                    onEarth: "#FFFFFF",
                    onMarble: "#2A2A27",
                    onLinen: "#333330",
                },
                border: {
                    light: "#E8E7E5", // Neutral 200
                    medium: "#D4D3D0",
                    dark: "#B5B3AE",
                },
                semantic: {
                    success: "#6B7254", // Olive-ish
                    warning: "#C8A882",
                    error: "#8B5A4A",
                    info: "#8A8C76",
                },
                // Raw palettes
                gray: {
                    50: "#F9FAF9",
                    100: "#F4F5F4",
                    200: "#E6E8E6",
                    300: "#D2D6D3",
                    400: "#9FA6A0",
                    500: "#737A74",
                    600: "#555C56",
                    700: "#444944",
                    800: "#363A36",
                    900: "#2B2E2C",
                },
                stone: {
                    DEFAULT: "#B9B0A3",
                    main: "#B9B0A3",
                    light: "#D1CCC3",
                    dark: "#A09689",
                    contrast: "#2A2621",
                    50: "#F5F4F2", 100: "#E8E6E2", 200: "#D1CCC3", 300: "#B9B0A3", 400: "#A09689", 500: "#8A7F6F", 600: "#6F655A", 700: "#544C44", 800: "#3A332E", 900: "#2A2621"
                },
                olive: {
                    DEFAULT: "#696B54",
                    main: "#696B54",
                    light: "#8A8C76",
                    dark: "#545642",
                    contrast: "#FFFFFF",
                    50: "#F2F3F0", 100: "#E4E5DF", 200: "#C8CAC0", 300: "#ADAFA0", 400: "#8A8C76", 500: "#696B54", 600: "#54564A", 700: "#3F413A", 800: "#2B2C29", 900: "#1A1B19"
                },
                earth: {
                    DEFAULT: "#563B29",
                    main: "#563B29",
                    light: "#755340",
                    dark: "#3D2A1D",
                    contrast: "#FFFFFF",
                    50: "#F3F0ED", 100: "#E4DDD7", 200: "#C8BAAF", 300: "#AD9888", 400: "#917660", 500: "#755340", 600: "#563B29", 700: "#3D2A1D", 800: "#2B1E15", 900: "#1A120D"
                },
                marble: {
                    DEFAULT: "#B6B5AF",
                    main: "#B6B5AF",
                    light: "#D0CFC9",
                    dark: "#9C9B95",
                    contrast: "#2A2A27",
                    50: "#F7F7F6", 100: "#EBEBEA", 200: "#D0CFC9", 300: "#B6B5AF", 400: "#9C9B95", 500: "#82817B", 600: "#686761", 700: "#4E4D49", 800: "#343331", 900: "#1F1F1E"
                },
                linen: {
                    DEFAULT: "#C5C3BD",
                    main: "#C5C3BD",
                    light: "#DCD9D4",
                    dark: "#ABA99F",
                    contrast: "#333330",
                    50: "#F8F8F7", 100: "#EEEDE9", 200: "#DCD9D4", 300: "#C5C3BD", 400: "#ABA99F", 500: "#918F85", 600: "#77756B", 700: "#5D5B51", 800: "#434137", 900: "#2A2822"
                },
            },
            fontFamily: {
                display: ["var(--font-song-myung)", "Cormorant Garamond", "serif"], // Song Myung for KR Display
                heading: ["var(--font-nanum-myeongjo)", "Libre Baskerville", "serif"], // Nanum Myeongjo for KR Heading
                body: ["var(--font-nanum-gothic)", "Lato", "sans-serif"], // Nanum Gothic for KR Body
                accent: ["Josefin Sans", "sans-serif"],
                sans: ["var(--font-nanum-gothic)", "Lato", "sans-serif"],
                serif: ["var(--font-nanum-myeongjo)", "Libre Baskerville", "serif"],
            },
            borderRadius: {
                none: "0",
                xs: "2px",
                sm: "4px",
                md: "8px",
                lg: "12px",
                xl: "16px",
                "2xl": "24px",
                full: "9999px",
            },
            boxShadow: {
                xs: "0 1px 2px 0 rgba(28, 27, 26, 0.05)",
                sm: "0 2px 4px 0 rgba(28, 27, 26, 0.08)",
                md: "0 4px 8px -2px rgba(28, 27, 26, 0.1)",
                lg: "0 8px 16px -4px rgba(28, 27, 26, 0.12)",
                xl: "0 16px 32px -8px rgba(28, 27, 26, 0.15)",
                "2xl": "0 24px 48px -12px rgba(28, 27, 26, 0.18)",
                inner: "inset 0 2px 4px 0 rgba(28, 27, 26, 0.06)",
                organic: "0 8px 24px -4px rgba(89, 59, 41, 0.12)",
            },
            fontSize: {
                "display-xl": ["72px", "1.1"],
                "display-lg": ["60px", "1.15"],
                "display-md": ["48px", "1.2"],
                "display-sm": ["36px", "1.25"],
                "h1": ["48px", "1.2"],
                "h2": ["40px", "1.25"],
                "h3": ["32px", "1.3"],
                "h4": ["24px", "1.35"],
                "h5": ["20px", "1.4"],
                "h6": ["18px", "1.45"],
                "body-xl": ["20px", "1.7"],
                "body-lg": ["18px", "1.7"],
                "body-md": ["16px", "1.6"],
                "body-sm": ["14px", "1.6"],
                "body-xs": ["12px", "1.5"],
            },
            backgroundImage: {
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
            }
        },
    },
    plugins: [],
};
export default config;
