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
    id: string;
    name: string;
    colors: {
        background: string;
        text: string;
        tokens: SyntaxColors;
    };
    window: WindowColors;
}
