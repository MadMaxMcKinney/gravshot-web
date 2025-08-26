import CodeWindow from "@/components/CodeWindow";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import DragHandle from "@/components/DragHandle";

interface CodePreviewProps {
    config: {
        language: string;
        theme: string;
        padding: number;
        windowWidth: number;
        backgroundPadding: number;
        backgroundColor: string;
        backgroundImage: string | null;
        fileName: string;
        code: string;
    };
    setConfig: (config: any) => void;
    showDragControls: boolean;
}

export default function CodePreview({ config, setConfig, showDragControls }: CodePreviewProps) {
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
                {showDragControls && (
                    <>
                        <DragHandle
                            type="backgroundPadding"
                            value={config.backgroundPadding}
                            onChange={(value) => setConfig({ ...config, backgroundPadding: value })}
                            min={20}
                            max={100}
                            direction="vertical"
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                        />
                        <DragHandle
                            type="windowWidth"
                            value={config.windowWidth}
                            onChange={(value) => setConfig({ ...config, windowWidth: value })}
                            min={300}
                            max={800}
                            direction="horizontal"
                            className="absolute -right-12 top-1/2 transform -translate-y-1/2"
                        />
                    </>
                )}
                <CodeWindow fileName={config.fileName} windowWidth={config.windowWidth} theme={config.theme}>
                    <SyntaxHighlighter language={config.language} theme={config.theme} code={config.code} padding={config.padding} />
                </CodeWindow>
            </div>
        </div>
    );
}
