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

export interface Theme {
  id: string;
  name: string;
  syntax: {
    backgroundColor: string;
    textColor: string;
    tokens: SyntaxColors;
  };
  window: WindowColors;
  // Future: could add background color suggestions
  // background?: string;
}

export type ThemeId = 'vs-dark' | 'vs-light' | 'github-dark' | 'github-light' | 'monokai' | 'dracula';