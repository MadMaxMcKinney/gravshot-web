import { CodeWindowTheme, SyntaxColors, WindowColors } from "@/types/theme";

export interface ThemeConfig {
  id: string;
  name: string;
  background: string;
  text: string;
  tokens: SyntaxColors;
  window?: Partial<WindowColors>;
}

// Color utilities for auto-generating window colors
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const adjustBrightness = (hex: string, amount: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const adjust = (value: number) => Math.max(0, Math.min(255, Math.round(value + (amount * 255))));
  
  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
};

export const lighten = (color: string, amount: number): string => {
  return adjustBrightness(color, amount);
};

// Main theme factory function
export const createTheme = (config: ThemeConfig): CodeWindowTheme => {
  const defaultWindow: WindowColors = {
    background: config.background,
    titlebar: lighten(config.background, 0.05),
    border: lighten(config.background, 0.15),
    text: config.text,
  };

  return {
    id: config.id,
    name: config.name,
    colors: {
      background: config.background,
      text: config.text,
      tokens: config.tokens,
    },
    window: {
      ...defaultWindow,
      ...config.window, // Allow overrides
    },
  };
};