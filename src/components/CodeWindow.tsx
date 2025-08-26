interface CodeWindowProps {
    fileName: string;
    children: React.ReactNode;
    windowWidth: number;
    theme: string;
}

const getThemeWindowColors = (theme: string) => {
  const themeColors = {
    'vs-dark': {
      background: '#1e1e1e',
      titlebar: '#2d2d30',
      border: '#3e3e42',
      text: '#cccccc'
    },
    'vs-light': {
      background: '#ffffff',
      titlebar: '#f3f3f3',
      border: '#e5e5e5',
      text: '#333333'
    },
    'github-dark': {
      background: '#0d1117',
      titlebar: '#21262d',
      border: '#30363d',
      text: '#f0f6fc'
    },
    'github-light': {
      background: '#ffffff',
      titlebar: '#f6f8fa',
      border: '#d1d9e0',
      text: '#24292f'
    },
    'monokai': {
      background: '#272822',
      titlebar: '#3e3d32',
      border: '#49483e',
      text: '#f8f8f2'
    },
    'dracula': {
      background: '#282a36',
      titlebar: '#44475a',
      border: '#6272a4',
      text: '#f8f8f2'
    }
  };
  return themeColors[theme as keyof typeof themeColors] || themeColors['vs-dark'];
};

export default function CodeWindow({ fileName, children, windowWidth, theme }: CodeWindowProps) {
    const colors = getThemeWindowColors(theme);
    
    return (
        <div 
            className="rounded-lg shadow-2xl overflow-hidden" 
            style={{ 
                width: windowWidth,
                backgroundColor: colors.background
            }}
        >
            <div 
                className="flex items-center justify-between px-4 py-3"
                style={{
                    backgroundColor: colors.titlebar,
                    borderBottom: `1px solid ${colors.border}`
                }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div 
                    className="text-sm font-medium"
                    style={{ color: colors.text }}
                >
                    {fileName}
                </div>

                <div className="w-16"></div>
            </div>

            <div>{children}</div>
        </div>
    );
}
