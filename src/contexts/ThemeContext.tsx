"use client";

import React, { createContext, useContext } from "react";
import { useSystemTheme, UseSystemThemeReturn } from "@/hooks/useSystemTheme";

const ThemeContext = createContext<UseSystemThemeReturn | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const themeState = useSystemTheme();

    return <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>;
}

export function useSystemThemeContext() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
