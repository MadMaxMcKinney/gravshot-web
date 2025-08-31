"use client";

import { useEffect, useState } from "react";
import { CodeWindowTheme } from "@/types/theme";

interface SyntaxHighlighterProps {
    language: string;
    theme: CodeWindowTheme;
    code: string;
    padding?: number;
}

const getLanguageClass = (language: string) => {
    const languageMap: { [key: string]: string } = {
        javascript: "javascript",
        typescript: "typescript",
        python: "python",
        java: "java",
        cpp: "cpp",
        css: "css",
        html: "markup",
        json: "json",
    };
    return languageMap[language] || "javascript";
};

export default function SyntaxHighlighter({ language, theme, code, padding = 20 }: SyntaxHighlighterProps) {
    const [highlightedCode, setHighlightedCode] = useState("");
    const themeConfig = theme;
    const prismLanguage = getLanguageClass(language);

    useEffect(() => {
        const loadPrism = async () => {
            try {
                // Dynamic import to avoid SSR issues
                const Prism = (await import("prismjs")).default;

                // Load required languages
                await Promise.all([
                    import("prismjs/components/prism-javascript"),
                    import("prismjs/components/prism-typescript"),
                    import("prismjs/components/prism-python"),
                    import("prismjs/components/prism-java"),
                    import("prismjs/components/prism-css"),
                    import("prismjs/components/prism-markup"),
                    import("prismjs/components/prism-json"),
                ]);

                // Load C++ separately as it might cause issues
                if (prismLanguage === "cpp") {
                    try {
                        await import("prismjs/components/prism-cpp");
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
                    font-family: "SF Mono", Monaco, "Inconsolata", "Roboto Mono", "Source Code Pro", monospace;
                    font-size: 14px;
                    line-height: 1.5;
                    white-space: pre-wrap;
                    overflow-x: auto;
                    margin: 0;
                }

                /* Custom theme colors */
                .syntax-highlighter :global(.token.keyword) {
                    color: ${themeConfig.colors.tokens.keyword};
                    font-weight: bold;
                }
                .syntax-highlighter :global(.token.string) {
                    color: ${themeConfig.colors.tokens.string};
                }
                .syntax-highlighter :global(.token.comment) {
                    color: ${themeConfig.colors.tokens.comment};
                    font-style: italic;
                }
                .syntax-highlighter :global(.token.number) {
                    color: ${themeConfig.colors.tokens.number};
                }
                .syntax-highlighter :global(.token.function) {
                    color: ${themeConfig.colors.tokens.function};
                }
                .syntax-highlighter :global(.token.operator) {
                    color: ${themeConfig.colors.tokens.operator};
                }
                .syntax-highlighter :global(.token.punctuation) {
                    color: ${themeConfig.colors.tokens.punctuation};
                }
            `}</style>
            <pre
                className="syntax-highlighter"
                style={{
                    backgroundColor: themeConfig.colors.background,
                    color: themeConfig.colors.text,
                }}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
        </div>
    );
}
