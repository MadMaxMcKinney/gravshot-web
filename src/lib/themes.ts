import { CodeWindowTheme, CodeWindowThemeId } from "@/types/theme";
import { vsDarkTheme, vsLightTheme } from "./themes/vs-themes";
import { githubDarkTheme, githubLightTheme } from "./themes/github-themes";
import { monokaiTheme, draculaTheme } from "./themes/popular-themes";

export const themes = {
    [vsDarkTheme.id]: vsDarkTheme,
    [vsLightTheme.id]: vsLightTheme,
    [githubDarkTheme.id]: githubDarkTheme,
    [githubLightTheme.id]: githubLightTheme,
    [monokaiTheme.id]: monokaiTheme,
    [draculaTheme.id]: draculaTheme,
} as const;

export const themeList = Object.values(themes);

export const getTheme = (themeId: string): CodeWindowTheme => {
    return themes[themeId as CodeWindowThemeId] || themes["vs-dark"];
};
