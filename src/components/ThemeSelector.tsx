"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

export default function ThemeSelector() {
    const [theme, setTheme] = useState<Theme>("system");

    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
        setTheme(savedTheme);
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        
        const handleChange = () => {
            if (theme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

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

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    const getThemeIcon = (themeOption: Theme) => {
        switch (themeOption) {
            case "light":
                return <Sun className="w-4 h-4" />;
            case "dark":
                return <Moon className="w-4 h-4" />;
            case "system":
                return <Monitor className="w-4 h-4" />;
        }
    };

    const getThemeLabel = (themeOption: Theme) => {
        switch (themeOption) {
            case "light":
                return "Light";
            case "dark":
                return "Dark";
            case "system":
                return "System";
        }
    };

    return (
        <Select value={theme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-32">
                <SelectValue>
                    <div className="flex items-center gap-2">
                        {getThemeIcon(theme)}
                        <span className="text-sm">{getThemeLabel(theme)}</span>
                    </div>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {(["light", "dark", "system"] as Theme[]).map((themeOption) => (
                    <SelectItem key={themeOption} value={themeOption}>
                        <div className="flex items-center gap-2">
                            {getThemeIcon(themeOption)}
                            <span>{getThemeLabel(themeOption)}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
