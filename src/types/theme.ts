export interface SyntaxColors {
    keyword: string;
    string: string;
    comment: string;
    number: string;
    function: string;
    operator: string;
    punctuation: string;
}

export interface ControlStyle {
    background: string;
    border: string;
    borderRadius: string;
    gap: string;
}

export interface WindowColors {
    background: string;
    titlebar: string;
    border: string;
    text: string;
}

export interface Theme {
    id: string;
    name: string;
    syntax: {
        backgroundColor: string;
        textColor: string;
        tokens: SyntaxColors;
    };
    window: WindowColors;
    controlStyle?: ControlStyle;
}

export type ThemeId = "vs-dark" | "vs-light" | "github-dark" | "github-light" | "monokai" | "dracula";
