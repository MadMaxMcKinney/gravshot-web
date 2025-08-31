import { CodeWindowThemeId } from "@/types/theme";

export interface ScreenshotConfig {
    language: string;
    themeId: CodeWindowThemeId;
    padding: number;
    windowWidth: number;
    backgroundPadding: number;
    backgroundColor: string;
    backgroundImage: string | null;
    fileName: string;
    code: string;
    showDragControls: boolean;
}
