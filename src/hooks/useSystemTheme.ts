import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export interface UseSystemThemeReturn {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    applyTheme: (theme: Theme) => void;
    effectiveTheme: "light" | "dark";
}

export function useSystemTheme(): UseSystemThemeReturn {
    const [theme, setThemeState] = useState<Theme>("system");
    const [isSystemDark, setIsSystemDark] = useState(false);

    // Check system theme preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsSystemDark(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsSystemDark(e.matches);
            // If currently using system theme, reapply it
            if (theme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
        setThemeState(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (selectedTheme: Theme) => {
        const html = document.documentElement;

        if (selectedTheme === "dark") {
            html.classList.add("dark");
        } else if (selectedTheme === "light") {
            html.classList.remove("dark");
        } else {
            // System theme
            const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (systemIsDark) {
                html.classList.add("dark");
            } else {
                html.classList.remove("dark");
            }
        }
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    // Calculate the effective theme (what's actually applied)
    const effectiveTheme: "light" | "dark" = theme === "system" ? (isSystemDark ? "dark" : "light") : theme;

    return {
        theme,
        setTheme,
        applyTheme,
        effectiveTheme,
    };
}
