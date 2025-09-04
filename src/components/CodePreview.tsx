import CodeWindow from "@/components/CodeWindow";
import EditableCodeEditor from "@/components/EditableCodeEditor";
import DragHandle from "@/components/DragHandle";
import { ScreenshotConfig } from "@/types/screenshot";

interface CodePreviewProps {
    config: ScreenshotConfig;
    setConfig: (config: ScreenshotConfig) => void;
    codeWindowRef?: any;
    exportMode?: boolean;
}

export default function CodePreview({ config, setConfig, codeWindowRef: ref, exportMode = false }: CodePreviewProps) {
    const backgroundStyle: React.CSSProperties = {
        padding: config.backgroundPadding,
    };

    switch (config.backgroundType) {
        case "color":
            backgroundStyle.background = config.backgroundColor;
            break;
        case "image":
            // When no image is set, use a checkerboard pattern
            backgroundStyle.background = config.backgroundImage
                ? `url(${config.backgroundImage})`
                : `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Crect x='0' y='0' width='10' height='10' fill='%23d0d0d0'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23d0d0d0'/%3E%3Crect x='10' y='0' width='10' height='10' fill='%23e8e8e8'/%3E%3Crect x='0' y='10' width='10' height='10' fill='%23e8e8e8'/%3E%3C/g%3E%3C/svg%3E")`;
            break;
        case "transparent":
            backgroundStyle.background = "transparent";
            break;
    }

    return (
        <div className="flex-1 flex items-center justify-center p-8">
            {/* Code */}
            <div className={`flex items-center justify-center relative bg-cover bg-center bg-no-repeat ${exportMode ? "" : "rounded-lg"}`} style={backgroundStyle} ref={ref}>
                {config.showDragControls && !exportMode && (
                    <>
                        <DragHandle
                            type="backgroundPadding"
                            value={config.backgroundPadding}
                            onChange={(value) => setConfig({ ...config, backgroundPadding: value })}
                            min={20}
                            max={100}
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                        />
                        <DragHandle
                            type="windowWidth"
                            value={config.windowWidth}
                            onChange={(value) => setConfig({ ...config, windowWidth: value })}
                            min={300}
                            max={800}
                            className="absolute -right-6 top-1/2 transform -translate-y-1/2"
                        />
                    </>
                )}
                <CodeWindow fileName={config.fileName} windowWidth={config.windowWidth} theme={config.theme} windowControlsTheme={config.windowControlsTheme}>
                    <EditableCodeEditor language={config.language} theme={config.theme} code={config.code} padding={config.padding} onChange={(newCode) => setConfig({ ...config, code: newCode })} />
                </CodeWindow>
            </div>
        </div>
    );
}
