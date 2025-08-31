import { CodeWindowControlsTheme } from "@/types/controls";

export default function CodeWindowControls({ windowControlsTheme, previewMode }: { windowControlsTheme: CodeWindowControlsTheme; previewMode?: boolean }) {
    function getControlStyles(index: number) {
        return {
            backgroundColor: windowControlsTheme.colors[index],
            borderRadius: windowControlsTheme.borderRadii[index],
            border: previewMode ? "1px solid var(--border)" : windowControlsTheme.borders ? `1px solid ${windowControlsTheme.borders[index]}` : undefined,
        };
    }

    return (
        <div
            className="flex items-center"
            style={{
                gap: windowControlsTheme.gap,
            }}
        >
            <div className="w-3 h-3" style={getControlStyles(0)}></div>
            <div className="w-3 h-3" style={getControlStyles(1)}></div>
            <div className="w-3 h-3" style={getControlStyles(2)}></div>
        </div>
    );
}
