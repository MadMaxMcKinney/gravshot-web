import { useEffect, useState } from "react";

export type SystemTheme = "light" | "dark" | "system";

export interface UseSystemThemeReturn {
    theme: SystemTheme;
    setTheme: (theme: SystemTheme) => void;
    applyTheme: (theme: SystemTheme) => void;
    effectiveTheme: "light" | "dark";
    initialTheme: SystemTheme;
}

export function useSystemTheme(): UseSystemThemeReturn {
    const [systemTheme, setSystemTheme] = useState<SystemTheme>("system");
    const [isSystemDark, setIsSystemDark] = useState(false);
    const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light");
    const [initialTheme, setInitialTheme] = useState<"light" | "dark">("light");

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
        setSystemTheme(savedTheme);
        applyTheme(savedTheme);

        // Set initial theme based on saved preference
        if (savedTheme === "system") {
            const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setInitialTheme(systemIsDark ? "dark" : "light");
        } else {
            setInitialTheme(savedTheme);
        }
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
        setSystemTheme(newTheme);
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
        initialTheme,
    };
}
