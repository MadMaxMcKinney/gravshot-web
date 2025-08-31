import { CodeWindowTheme } from '@/types/theme';

interface CodeWindowProps {
    fileName: string;
    children: React.ReactNode;
    windowWidth: number;
    theme: CodeWindowTheme;
}

export default function CodeWindow({ fileName, children, windowWidth, theme }: CodeWindowProps) {
    const themeConfig = theme;
    
    return (
        <div 
            className="rounded-lg shadow-2xl overflow-hidden" 
            style={{ 
                width: windowWidth,
                backgroundColor: themeConfig.window.background
            }}
        >
            <div 
                className="flex items-center justify-between px-4 py-3"
                style={{
                    backgroundColor: themeConfig.window.titlebar,
                    borderBottom: `1px solid ${themeConfig.window.border}`
                }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div 
                    className="text-sm font-medium"
                    style={{ color: themeConfig.window.text }}
                >
                    {fileName}
                </div>

                <div className="w-16"></div>
            </div>

            <div>{children}</div>
        </div>
    );
}
