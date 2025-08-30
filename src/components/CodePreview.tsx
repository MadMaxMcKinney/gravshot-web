import CodeWindow from "@/components/CodeWindow";
import EditableCodeEditor from "@/components/EditableCodeEditor";
import DragHandle from "@/components/DragHandle";
import { ScreenshotConfig } from "@/types/screenshot";

interface CodePreviewProps {
    config: ScreenshotConfig;
    setConfig: (config: ScreenshotConfig) => void;
}

export default function CodePreview({ config, setConfig }: CodePreviewProps) {
    const backgroundStyle = {
        backgroundColor: config.backgroundImage ? undefined : config.backgroundColor,
        backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: config.backgroundPadding,
    };

    return (
        <div className="flex-1 flex items-center justify-center p-8">
            <div className="flex items-center justify-center rounded-lg relative" style={backgroundStyle}>
                {config.showDragControls && (
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
                <CodeWindow fileName={config.fileName} windowWidth={config.windowWidth} theme={config.themeId}>
                    <EditableCodeEditor language={config.language} theme={config.themeId} code={config.code} padding={config.padding} onChange={(newCode) => setConfig({ ...config, code: newCode })} />
                </CodeWindow>
            </div>
        </div>
    );
}
