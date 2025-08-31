export interface CodeWindowControlsTheme {
    id: CodeWindowControlsThemeId;
    colors: [string, string, string];
    border: string;
    borderRadius: string;
    gap: string;
}

export type CodeWindowControlsThemeId = "macos" | "neutral" | "none";
