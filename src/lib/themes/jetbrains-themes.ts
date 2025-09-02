import { createTheme } from "../factories/themeFactory";

export const intellijDarkTheme = createTheme({
    id: "intellij-dark",
    name: "IntelliJ IDEA Dark",
    background: "#2b2b2b",
    text: "#a9b7c6",
    tokens: {
        keyword: "#cc7832",
        string: "#6a8759",
        comment: "#808080",
        number: "#6897bb",
        function: "#ffc66d",
        operator: "#a9b7c6",
        punctuation: "#a9b7c6",
    },
    window: {
        titlebar: "#3c3f41",
        border: "#555555",
        text: "#bbbbbb",
    },
});
