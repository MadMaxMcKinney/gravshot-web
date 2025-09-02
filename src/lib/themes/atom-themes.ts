import { createTheme } from "../factories/themeFactory";

export const atomOneDarkTheme = createTheme({
    id: "atom-one-dark",
    name: "Atom One Dark",
    background: "#282c34",
    text: "#abb2bf",
    tokens: {
        keyword: "#c678dd",
        string: "#98c379",
        comment: "#5c6370",
        number: "#d19a66",
        function: "#61afef",
        operator: "#56b6c2",
        punctuation: "#abb2bf",
    },
    window: {
        titlebar: "#21252b",
        border: "#181a1f",
        text: "#9da5b4",
    },
});

export const atomOneLightTheme = createTheme({
    id: "atom-one-light",
    name: "Atom One Light",
    background: "#fafafa",
    text: "#383a42",
    tokens: {
        keyword: "#a626a4",
        string: "#50a14f",
        comment: "#a0a1a7",
        number: "#986801",
        function: "#4078f2",
        operator: "#0184bc",
        punctuation: "#383a42",
    },
    window: {
        titlebar: "#f0f0f0",
        border: "#e5e5e6",
        text: "#4f4f4f",
    },
});