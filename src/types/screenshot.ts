import { CodeWindowTheme } from "@/types/theme";

export type BackgroundType = "color" | "image" | "transparent";

export interface ScreenshotConfig {
    language: string;
    theme: CodeWindowTheme;
    padding: number;
    windowWidth: number;
    backgroundPadding: number;
    backgroundColor: string;
    backgroundImage: string | null;
    backgroundType: BackgroundType;
    fileName: string;
    code: string;
    showDragControls: boolean;
}
