interface SyntaxHighlighterProps {
  language: string;
  theme: string;
  code: string;
  padding?: number;
}

const getLanguageClass = (language: string) => {
  const languageMap: { [key: string]: string } = {
    javascript: 'language-javascript',
    typescript: 'language-typescript', 
    python: 'language-python',
    java: 'language-java',
    cpp: 'language-cpp',
    css: 'language-css',
    html: 'language-html',
    json: 'language-json'
  };
  return languageMap[language] || 'language-javascript';
};

const getThemeStyles = (theme: string) => {
  const themes: { [key: string]: React.CSSProperties } = {
    'vs-dark': {
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4'
    },
    'vs-light': {
      backgroundColor: '#ffffff',
      color: '#000000'
    },
    'github-dark': {
      backgroundColor: '#0d1117',
      color: '#c9d1d9'
    },
    'github-light': {
      backgroundColor: '#ffffff',
      color: '#24292f'
    },
    'monokai': {
      backgroundColor: '#272822',
      color: '#f8f8f2'
    },
    'dracula': {
      backgroundColor: '#282a36',
      color: '#f8f8f2'
    }
  };
  return themes[theme] || themes['vs-dark'];
};

const highlightSyntax = (code: string, language: string) => {
  const keywords: { [key: string]: string[] } = {
    javascript: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'console', 'log'],
    typescript: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'interface', 'type', 'export'],
    python: ['def', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'class', 'print'],
    java: ['public', 'private', 'class', 'interface', 'if', 'else', 'for', 'while', 'return', 'static', 'void'],
    cpp: ['#include', 'int', 'void', 'if', 'else', 'for', 'while', 'return', 'cout', 'cin', 'std'],
    css: ['color', 'background', 'margin', 'padding', 'border', 'width', 'height', 'display', 'flex'],
    html: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'a', 'img', 'ul', 'li', 'class', 'id'],
    json: []
  };

  const languageKeywords = keywords[language] || keywords.javascript;
  let highlightedCode = code;

  languageKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlightedCode = highlightedCode.replace(regex, `<span class="keyword">${keyword}</span>`);
  });

  highlightedCode = highlightedCode.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
  highlightedCode = highlightedCode.replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>');
  highlightedCode = highlightedCode.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
  highlightedCode = highlightedCode.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
  highlightedCode = highlightedCode.replace(/\b\d+\b/g, '<span class="number">$&</span>');

  return highlightedCode;
};

export default function SyntaxHighlighter({ language, theme, code, padding = 20 }: SyntaxHighlighterProps) {
  const themeStyles = getThemeStyles(theme);
  const highlightedCode = highlightSyntax(code, language);

  return (
    <div style={{ padding }}>
      <style jsx>{`
        .syntax-highlighter {
          font-family: 'SF Mono', Monaco, 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          overflow-x: auto;
        }
        .syntax-highlighter :global(.keyword) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#0000ff' : '#569cd6'};
          font-weight: bold;
        }
        .syntax-highlighter :global(.string) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#a31515' : '#ce9178'};
        }
        .syntax-highlighter :global(.comment) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#008000' : '#6a9955'};
          font-style: italic;
        }
        .syntax-highlighter :global(.number) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#098658' : '#b5cea8'};
        }
      `}</style>
      <pre 
        className="syntax-highlighter"
        style={themeStyles}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}