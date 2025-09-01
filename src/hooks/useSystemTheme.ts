import { useEffect, useState } from "react";

export type SystemTheme = "light" | "dark" | "system";

export interface UseSystemThemeReturn {
    theme: SystemTheme;
    setTheme: (theme: SystemTheme) => void;
    applyTheme: (theme: SystemTheme) => void;
    effectiveTheme: "light" | "dark";
}

export function useSystemTheme(): UseSystemThemeReturn {
    const [systemTheme, setSystemThemeState] = useState<SystemTheme>("system");
    const [isSystemDark, setIsSystemDark] = useState(false);
    const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light");

    // Check system theme preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsSystemDark(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsSystemDark(e.matches);
            // If currently using system theme, reapply it
            if (systemTheme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [systemTheme]);

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = (localStorage.getItem("theme") as SystemTheme) || "system";
        setSystemThemeState(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (selectedTheme: SystemTheme) => {
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

    const setTheme = (newTheme: SystemTheme) => {
        setSystemThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    // Update effectiveTheme when dependencies change
    useEffect(() => {
        const newEffectiveTheme = systemTheme === "system" ? (isSystemDark ? "dark" : "light") : systemTheme;
        setEffectiveTheme(newEffectiveTheme);
    }, [systemTheme, isSystemDark]);

    return {
        theme: systemTheme,
        setTheme,
        applyTheme,
        effectiveTheme,
    };
}
