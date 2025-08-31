import { CodeWindowTheme } from "@/types/theme";

interface ThemePreviewProps {
    theme: CodeWindowTheme;
    isSelected?: boolean;
}

export default function ThemePreview({ theme, isSelected = false }: ThemePreviewProps) {
    return (
        <div className="flex items-center gap-3 w-full">
            {/* Theme color palette preview */}
            <div className="flex rounded-md overflow-hidden border border-border/50 shadow-sm" style={{ minWidth: "48px", height: "24px" }}>
                {/* Background color */}
                <div className="w-3 h-full" style={{ backgroundColor: theme.colors.background }} />
                {/* Window colors */}
                <div className="w-3 h-full" style={{ backgroundColor: theme.window.titlebar }} />
                {/* Syntax colors preview */}
                <div className="w-2 h-full" style={{ backgroundColor: theme.colors.tokens.keyword }} />
                <div className="w-2 h-full" style={{ backgroundColor: theme.colors.tokens.string }} />
                <div className="w-2 h-full" style={{ backgroundColor: theme.colors.tokens.function }} />
                <div className="w-2 h-full" style={{ backgroundColor: theme.colors.tokens.comment }} />
            </div>

            {/* Theme name */}
            <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>{theme.name}</span>
        </div>
    );
}
