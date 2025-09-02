import { CodeWindowControlsTheme } from "@/types/controls";

export interface CodeWindowControlsThemeFactoryConfig {
    id: string;
    name: string;
    gap: string;
    colors: [string, string, string];
    borders?: [string, string, string];
    borderRadii: [string, string, string] | string;
}

export function createWindowControlsTheme(config: CodeWindowControlsThemeFactoryConfig): CodeWindowControlsTheme {
    // Normalize borderRadii to an array if it's a string. In English, this means converting a single value into a list of three identical values. Quality of life option to simplify usage.
    if (typeof config.borderRadii === "string") {
        config.borderRadii = [config.borderRadii, config.borderRadii, config.borderRadii];
    }

    return {
        id: config.id,
        name: config.name,
        gap: config.gap,
        colors: config.colors,
        borders: config.borders,
        borderRadii: config.borderRadii,
    };
}
