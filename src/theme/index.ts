import {
    ComponentStyleConfig,
    extendTheme,
    theme as base,
    withDefaultColorScheme,
    withDefaultVariant,
} from "@chakra-ui/react";

const inputSelectStyles: ComponentStyleConfig = {
    variants: {
        filled: {
            field: {
                _focus: { borderColor: "primary.500" },
            },
        },
    },
    sizes: {
        // md: { field: { borderRadius: "none" } },
    },
};

const Tabs: ComponentStyleConfig = {
    parts: ["tab"],
    // The styles all button have in common
    variants: {
        line: {
            tab: {
                _selected: {
                    borderBottomWidth: 2,
                    borderBottomColor: "primary.500",
                    color: "black",
                },
                _hover: { bg: "gray.50" },
            },
        },
    },
};

const Link: ComponentStyleConfig = {
    baseStyle: {
        color: "primary.600",
        fontWeight: "bold"
    },
};

const theme = extendTheme(
    {
        colors: {
            primary: {
                50: "#f5fee5",
                100: "#e1fbb2",
                200: "#cdf781",
                300: "#b8ee56",
                400: "#a2e032",
                500: "#8ac919",
                600: "#71ab09",
                700: "#578602",
                800: "#3c5e00",
                900: "#203300",
            },
        },
        fonts: {
            heading: `Montserrat, ${base.fonts.heading}`,
            body: `sans-serif, ${base.fonts.mono}`,
            // body: `Monospace, ${base.fonts.body}`,
        },
        components: {
            // Button: Tab,
            Tabs,
            Input: inputSelectStyles,
            Link,

            // Select: inputSelectStyles,
        },
    },
    withDefaultColorScheme({
        colorScheme: "primary",
        components: ["Checkbox", "Button"],
    }),
    withDefaultVariant({
        variant: "filled",
        components: ["Input", "Select"],
    })
);

export default theme;
