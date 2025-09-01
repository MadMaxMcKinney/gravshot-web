"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Monitor, Moon, Sun } from "lucide-react";
import { useSystemThemeContext } from "@/contexts/ThemeContext";
import type { SystemTheme } from "@/hooks/useSystemTheme";

export default function ThemeSelector() {
    const { theme, setTheme } = useSystemThemeContext();

    const getThemeIcon = (themeOption: SystemTheme) => {
        switch (themeOption) {
            case "light":
                return <Sun className="w-4 h-4" />;
            case "dark":
                return <Moon className="w-4 h-4" />;
            case "system":
                return <Monitor className="w-4 h-4" />;
        }
    };

    const getThemeLabel = (themeOption: SystemTheme) => {
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
        <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-32">
                <SelectValue>
                    <div className="flex items-center gap-2">
                        {getThemeIcon(theme)}
                        <span className="text-sm">{getThemeLabel(theme)}</span>
                    </div>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {(["light", "dark", "system"] as SystemTheme[]).map((themeOption) => (
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
