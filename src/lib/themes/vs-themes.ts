import { createTheme } from "../themeFactory";

export const vsDarkTheme = createTheme({
    id: "vs-dark",
    name: "VS Dark",
    background: "#1e1e1e",
    text: "#d4d4d4",
    tokens: {
        keyword: "#569cd6",
        string: "#ce9178",
        comment: "#6a9955",
        number: "#b5cea8",
        function: "#dcdcaa",
        operator: "#d4d4d4",
        punctuation: "#d4d4d4",
    },
    window: {
        titlebar: "#2d2d30",
        border: "#3e3e42",
        text: "#cccccc",
    },
});

export const vsLightTheme = createTheme({
    id: "vs-light",
    name: "VS Light",
    background: "#ffffff",
    text: "#000000",
    tokens: {
        keyword: "#0000ff",
        string: "#a31515",
        comment: "#008000",
        number: "#098658",
        function: "#795e26",
        operator: "#000000",
        punctuation: "#000000",
    },
    window: {
        titlebar: "#f3f3f3",
        border: "#e5e5e5",
        text: "#333333",
    },
});
