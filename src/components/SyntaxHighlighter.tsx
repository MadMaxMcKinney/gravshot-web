"use client";

import { useEffect, useState } from 'react';

interface SyntaxHighlighterProps {
  language: string;
  theme: string;
  code: string;
  padding?: number;
}

const getLanguageClass = (language: string) => {
  const languageMap: { [key: string]: string } = {
    javascript: 'javascript',
    typescript: 'typescript', 
    python: 'python',
    java: 'java',
    cpp: 'cpp',
    css: 'css',
    html: 'markup',
    json: 'json'
  };
  return languageMap[language] || 'javascript';
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

export default function SyntaxHighlighter({ language, theme, code, padding = 20 }: SyntaxHighlighterProps) {
  const [highlightedCode, setHighlightedCode] = useState('');
  const themeStyles = getThemeStyles(theme);
  const prismLanguage = getLanguageClass(language);

  useEffect(() => {
    const loadPrism = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const Prism = (await import('prismjs')).default;
        
        // Load required languages
        await Promise.all([
          import('prismjs/components/prism-javascript'),
          import('prismjs/components/prism-typescript'),
          import('prismjs/components/prism-python'),
          import('prismjs/components/prism-java'),
          import('prismjs/components/prism-css'),
          import('prismjs/components/prism-markup'),
          import('prismjs/components/prism-json'),
        ]);

        // Load C++ separately as it might cause issues
        if (prismLanguage === 'cpp') {
          try {
            await import('prismjs/components/prism-cpp');
          } catch (err) {
            // Fallback to plain text for cpp if it fails
            setHighlightedCode(code);
            return;
          }
        }

        if (Prism.languages[prismLanguage]) {
          const highlighted = Prism.highlight(code, Prism.languages[prismLanguage], prismLanguage);
          setHighlightedCode(highlighted);
        } else {
          setHighlightedCode(code);
        }
      } catch (error) {
        // Fallback to plain text if highlighting fails
        setHighlightedCode(code);
      }
    };

    loadPrism();
  }, [code, prismLanguage]);

  return (
    <div style={{ padding }}>
      <style jsx>{`
        .syntax-highlighter {
          font-family: 'SF Mono', Monaco, 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          overflow-x: auto;
          margin: 0;
        }
        
        /* Custom theme colors */
        .syntax-highlighter :global(.token.keyword) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#0000ff' : '#569cd6'};
          font-weight: bold;
        }
        .syntax-highlighter :global(.token.string) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#a31515' : '#ce9178'};
        }
        .syntax-highlighter :global(.token.comment) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#008000' : '#6a9955'};
          font-style: italic;
        }
        .syntax-highlighter :global(.token.number) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#098658' : '#b5cea8'};
        }
        .syntax-highlighter :global(.token.function) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#795e26' : '#dcdcaa'};
        }
        .syntax-highlighter :global(.token.operator) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#000000' : '#d4d4d4'};
        }
        .syntax-highlighter :global(.token.punctuation) {
          color: ${theme === 'vs-light' || theme === 'github-light' ? '#000000' : '#d4d4d4'};
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