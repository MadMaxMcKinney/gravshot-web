import { CodeWindowTheme } from "@/types/theme";

interface ThemePreviewProps {
    theme: CodeWindowTheme;
    isSelected?: boolean;
}

export default function ThemePreview({ theme }: ThemePreviewProps) {
    return (
        <div className="w-full">
            {/* Theme color palette preview */}
            <div
                className="rounded-lg w-full shadow-2xl overflow-hidden"
                style={{
                    backgroundColor: theme.window.background,
                }}
            >
                <div
                    className="flex items-center justify-center px-4 py-2"
                    style={{
                        backgroundColor: theme.window.titlebar,
                        borderBottom: `1px solid ${theme.window.border}`,
                    }}
                >
                    <div className="text-sm font-medium" style={{ color: theme.window.text }}>
                        {theme.name}
                    </div>
                </div>
                <div className="w-full p-2">
                    <div className="flex w-full rounded-md overflow-hidden border border-border/50 shadow-sm" style={{ height: "24px" }}>
                        {/* Background color */}
                        <div className="flex-1 h-full" style={{ backgroundColor: theme.colors.background }} />
                        {/* Window colors */}
                        <div className="flex-1 h-full" style={{ backgroundColor: theme.window.titlebar }} />
                        {/* Syntax colors preview */}
                        <div className="flex-1 h-full" style={{ backgroundColor: theme.colors.tokens.keyword }} />
                        <div className="flex-1 h-full" style={{ backgroundColor: theme.colors.tokens.string }} />
                        <div className="flex-1 h-full" style={{ backgroundColor: theme.colors.tokens.function }} />
                        <div className="flex-1 h-full" style={{ backgroundColor: theme.colors.tokens.comment }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
