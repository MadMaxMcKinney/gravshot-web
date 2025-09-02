import { createTheme } from "../factories/themeFactory";

export const materialDarkerTheme = createTheme({
    id: "material-darker",
    name: "Material Darker",
    background: "#212121",
    text: "#eeffff",
    tokens: {
        keyword: "#c792ea",
        string: "#c3e88d",
        comment: "#546e7a",
        number: "#f78c6c",
        function: "#82aaff",
        operator: "#89ddff",
        punctuation: "#eeffff",
    },
    window: {
        titlebar: "#1a1a1a",
        border: "#2a2a2a",
        text: "#b0bec5",
    },
});

export const materialOceanTheme = createTheme({
    id: "material-ocean",
    name: "Material Ocean",
    background: "#0f111a",
    text: "#8f93a2",
    tokens: {
        keyword: "#c792ea",
        string: "#c3e88d",
        comment: "#717cb4",
        number: "#f78c6c",
        function: "#82aaff",
        operator: "#89ddff",
        punctuation: "#8f93a2",
    },
    window: {
        titlebar: "#090b10",
        border: "#1f2233",
        text: "#a6accd",
    },
});

export const materialPaleNightTheme = createTheme({
    id: "material-palenight",
    name: "Material Palenight",
    background: "#292d3e",
    text: "#a6accd",
    tokens: {
        keyword: "#c792ea",
        string: "#c3e88d",
        comment: "#676e95",
        number: "#f78c6c",
        function: "#82aaff",
        operator: "#89ddff",
        punctuation: "#89ddff",
    },
    window: {
        titlebar: "#1f2233",
        border: "#3a3f58",
        text: "#959dcb",
    },
});