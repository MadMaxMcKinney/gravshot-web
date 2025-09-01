import { useEffect } from "react";

type Theme = "light" | "dark" | "system";

export function useSystemThemeInit() {
    useEffect(() => {
        const savedTheme = (localStorage.getItem("theme") as Theme) || "system";

        const applyInitialTheme = (selectedTheme: Theme) => {
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

        applyInitialTheme(savedTheme);
    }, []);
}
