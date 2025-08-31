import { createTheme } from "../themeFactory";

export const monokaiTheme = createTheme({
    id: "monokai",
    name: "Monokai",
    background: "#272822",
    text: "#f8f8f2",
    tokens: {
        keyword: "#f92672",
        string: "#e6db74",
        comment: "#75715e",
        number: "#ae81ff",
        function: "#a6e22e",
        operator: "#f8f8f2",
        punctuation: "#f8f8f2",
    },
    window: {
        titlebar: "#3e3d32",
        border: "#49483e",
    },
});

export const draculaTheme = createTheme({
    id: "dracula",
    name: "Dracula",
    background: "#282a36",
    text: "#f8f8f2",
    tokens: {
        keyword: "#ff79c6",
        string: "#f1fa8c",
        comment: "#6272a4",
        number: "#bd93f9",
        function: "#50fa7b",
        operator: "#f8f8f2",
        punctuation: "#f8f8f2",
    },
    window: {
        titlebar: "#44475a",
        border: "#6272a4",
    },
});
