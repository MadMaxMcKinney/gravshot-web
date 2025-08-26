import { Theme, ThemeId } from '@/types/theme';

export const themes: Record<ThemeId, Theme> = {
  'vs-dark': {
    id: 'vs-dark',
    name: 'VS Dark',
    syntax: {
      backgroundColor: '#1e1e1e',
      textColor: '#d4d4d4',
      tokens: {
        keyword: '#569cd6',
        string: '#ce9178',
        comment: '#6a9955',
        number: '#b5cea8',
        function: '#dcdcaa',
        operator: '#d4d4d4',
        punctuation: '#d4d4d4'
      }
    },
    window: {
      background: '#1e1e1e',
      titlebar: '#2d2d30',
      border: '#3e3e42',
      text: '#cccccc'
    }
  },
  'vs-light': {
    id: 'vs-light',
    name: 'VS Light',
    syntax: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      tokens: {
        keyword: '#0000ff',
        string: '#a31515',
        comment: '#008000',
        number: '#098658',
        function: '#795e26',
        operator: '#000000',
        punctuation: '#000000'
      }
    },
    window: {
      background: '#ffffff',
      titlebar: '#f3f3f3',
      border: '#e5e5e5',
      text: '#333333'
    }
  },
  'github-dark': {
    id: 'github-dark',
    name: 'GitHub Dark',
    syntax: {
      backgroundColor: '#0d1117',
      textColor: '#c9d1d9',
      tokens: {
        keyword: '#ff7b72',
        string: '#a5d6ff',
        comment: '#8b949e',
        number: '#79c0ff',
        function: '#d2a8ff',
        operator: '#c9d1d9',
        punctuation: '#c9d1d9'
      }
    },
    window: {
      background: '#0d1117',
      titlebar: '#21262d',
      border: '#30363d',
      text: '#f0f6fc'
    }
  },
  'github-light': {
    id: 'github-light',
    name: 'GitHub Light',
    syntax: {
      backgroundColor: '#ffffff',
      textColor: '#24292f',
      tokens: {
        keyword: '#cf222e',
        string: '#0a3069',
        comment: '#6e7781',
        number: '#0550ae',
        function: '#8250df',
        operator: '#24292f',
        punctuation: '#24292f'
      }
    },
    window: {
      background: '#ffffff',
      titlebar: '#f6f8fa',
      border: '#d1d9e0',
      text: '#24292f'
    }
  },
  'monokai': {
    id: 'monokai',
    name: 'Monokai',
    syntax: {
      backgroundColor: '#272822',
      textColor: '#f8f8f2',
      tokens: {
        keyword: '#f92672',
        string: '#e6db74',
        comment: '#75715e',
        number: '#ae81ff',
        function: '#a6e22e',
        operator: '#f8f8f2',
        punctuation: '#f8f8f2'
      }
    },
    window: {
      background: '#272822',
      titlebar: '#3e3d32',
      border: '#49483e',
      text: '#f8f8f2'
    }
  },
  'dracula': {
    id: 'dracula',
    name: 'Dracula',
    syntax: {
      backgroundColor: '#282a36',
      textColor: '#f8f8f2',
      tokens: {
        keyword: '#ff79c6',
        string: '#f1fa8c',
        comment: '#6272a4',
        number: '#bd93f9',
        function: '#50fa7b',
        operator: '#f8f8f2',
        punctuation: '#f8f8f2'
      }
    },
    window: {
      background: '#282a36',
      titlebar: '#44475a',
      border: '#6272a4',
      text: '#f8f8f2'
    }
  }
};

export const getTheme = (themeId: string): Theme => {
  return themes[themeId as ThemeId] || themes['vs-dark'];
};

export const getThemeList = (): Array<{ value: string; label: string }> => {
  return Object.values(themes).map(theme => ({
    value: theme.id,
    label: theme.name
  }));
};