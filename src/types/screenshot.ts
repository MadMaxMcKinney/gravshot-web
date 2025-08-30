import { ThemeId } from "@/types/theme";

export interface ScreenshotConfig {
    language: string;
    themeId: ThemeId;
    padding: number;
    windowWidth: number;
    backgroundPadding: number;
    backgroundColor: string;
    backgroundImage: string | null;
    fileName: string;
    code: string;
    showDragControls: boolean;
}
