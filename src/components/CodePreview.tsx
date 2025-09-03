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
            backgroundStyle.backgroundColor = config.backgroundColor;
            break;
        case "image":
            backgroundStyle.backgroundImage = `url(${config.backgroundImage})`;
            break;
        case "transparent":
            backgroundStyle.backgroundColor = "transparent";
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
