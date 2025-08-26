import CodeWindow from "@/components/CodeWindow";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";

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
}

export default function CodePreview({ config }: CodePreviewProps) {
  const backgroundStyle = {
    backgroundColor: config.backgroundImage ? undefined : config.backgroundColor,
    backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: config.backgroundPadding
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div 
        className="flex items-center justify-center rounded-lg"
        style={backgroundStyle}
      >
        <CodeWindow
          fileName={config.fileName}
          windowWidth={config.windowWidth}
        >
          <SyntaxHighlighter
            language={config.language}
            theme={config.theme}
            code={config.code}
            padding={config.padding}
          />
        </CodeWindow>
      </div>
    </div>
  );
}