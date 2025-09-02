import { createTheme } from "../factories/themeFactory";

export const githubDarkTheme = createTheme({
    id: "github-dark",
    name: "GitHub Dark",
    background: "#0d1117",
    text: "#c9d1d9",
    tokens: {
        keyword: "#ff7b72",
        string: "#a5d6ff",
        comment: "#8b949e",
        number: "#79c0ff",
        function: "#d2a8ff",
        operator: "#c9d1d9",
        punctuation: "#c9d1d9",
    },
    window: {
        titlebar: "#21262d",
        border: "#30363d",
        text: "#f0f6fc",
    },
});

export const githubLightTheme = createTheme({
    id: "github-light",
    name: "GitHub Light",
    background: "#ffffff",
    text: "#24292f",
    tokens: {
        keyword: "#cf222e",
        string: "#0a3069",
        comment: "#6e7781",
        number: "#0550ae",
        function: "#8250df",
        operator: "#24292f",
        punctuation: "#24292f",
    },
    window: {
        titlebar: "#f6f8fa",
        border: "#d1d9e0",
    },
});
