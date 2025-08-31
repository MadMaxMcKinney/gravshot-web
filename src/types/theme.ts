export interface SyntaxColors {
    keyword: string;
    string: string;
    comment: string;
    number: string;
    function: string;
    operator: string;
    punctuation: string;
}

export interface WindowColors {
    background: string;
    titlebar: string;
    border: string;
    text: string;
}

export interface CodeWindowTheme {
    id: CodeWindowThemeId;
    name: string;
    colors: {
        background: string;
        text: string;
        tokens: SyntaxColors;
    };
    window: WindowColors;
}

export type CodeWindowThemeId = "vs-dark" | "vs-light" | "github-dark" | "github-light" | "monokai" | "dracula";
