import { createTheme } from "../factories/themeFactory";

export const solarizedDarkTheme = createTheme({
    id: "solarized-dark",
    name: "Solarized Dark",
    background: "#002b36",
    text: "#839496",
    tokens: {
        keyword: "#268bd2",
        string: "#2aa198",
        comment: "#586e75",
        number: "#d33682",
        function: "#b58900",
        operator: "#859900",
        punctuation: "#93a1a1",
    },
    window: {
        titlebar: "#073642",
        border: "#586e75",
        text: "#93a1a1",
    },
});

export const solarizedLightTheme = createTheme({
    id: "solarized-light",
    name: "Solarized Light",
    background: "#fdf6e3",
    text: "#657b83",
    tokens: {
        keyword: "#268bd2",
        string: "#2aa198",
        comment: "#93a1a1",
        number: "#d33682",
        function: "#b58900",
        operator: "#859900",
        punctuation: "#586e75",
    },
    window: {
        titlebar: "#eee8d5",
        border: "#93a1a1",
        text: "#586e75",
    },
});