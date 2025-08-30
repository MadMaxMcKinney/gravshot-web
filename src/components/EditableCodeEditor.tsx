"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getTheme } from "@/lib/themes";

interface EditableCodeEditorProps {
    language: string;
    theme: string;
    code: string;
    padding?: number;
    onChange: (code: string) => void;
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

export default function EditableCodeEditor({ language, theme, code, padding = 20, onChange }: EditableCodeEditorProps) {
    const [highlightedCode, setHighlightedCode] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const preRef = useRef<HTMLPreElement>(null);
    const themeConfig = getTheme(theme);
    const prismLanguage = getLanguageClass(language);

    const highlightCode = useCallback(
        async (codeToHighlight: string) => {
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
                        setHighlightedCode(codeToHighlight);
                        return;
                    }
                }

                if (Prism.languages[prismLanguage]) {
                    const highlighted = Prism.highlight(codeToHighlight, Prism.languages[prismLanguage], prismLanguage);
                    setHighlightedCode(highlighted);
                } else {
                    setHighlightedCode(codeToHighlight);
                }
            } catch (error) {
                // Fallback to plain text if highlighting fails
                setHighlightedCode(codeToHighlight);
            }
        },
        [prismLanguage]
    );

    useEffect(() => {
        highlightCode(code);
    }, [code, highlightCode]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        onChange(newCode);
    };

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        if (preRef.current && textareaRef.current) {
            preRef.current.scrollTop = textareaRef.current.scrollTop;
            preRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Handle tab indentation
        if (e.key === "Tab") {
            e.preventDefault();
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue = textarea.value.substring(0, start) + "  " + textarea.value.substring(end);

            onChange(newValue);

            // Set cursor position after the inserted spaces
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 2;
            }, 0);
        }
    };

    // Calculate height based on content
    const lineHeight = 1.5;
    const fontSize = 14;
    const lines = code.split("\n").length;
    const contentHeight = Math.max(lines * fontSize * lineHeight + padding * 2, 100); // Minimum 100px height

    const commonStyles = {
        fontFamily: "'SF Mono', Monaco, 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace",
        fontSize: "14px",
        lineHeight: "1.5",
        margin: 0,
        border: "none",
        outline: "none",
        resize: "none" as const,
        whiteSpace: "pre" as const,
        wordWrap: "break-word" as const,
        overflowWrap: "break-word" as const,
        padding,
        width: "100%",
        height: `${contentHeight}px`,
    };

    return (
        <div style={{ position: "relative", width: "100%", height: `${contentHeight}px` }}>
            <style jsx>{`
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

            {/* Syntax highlighted pre element (background) */}
            <pre
                ref={preRef}
                className="syntax-highlighter"
                style={{
                    ...commonStyles,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    backgroundColor: themeConfig.colors.background,
                    color: themeConfig.colors.text,
                    pointerEvents: "none",
                    overflow: "hidden",
                    boxSizing: "border-box",
                }}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />

            {/* Transparent textarea (foreground) */}
            <textarea
                ref={textareaRef}
                value={code}
                onChange={handleTextareaChange}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                style={{
                    ...commonStyles,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    backgroundColor: "transparent",
                    color: "transparent",
                    caretColor: themeConfig.colors.text,
                    overflow: "auto",
                    boxSizing: "border-box",
                }}
            />
        </div>
    );
}
