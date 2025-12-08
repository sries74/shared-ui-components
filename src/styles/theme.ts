/**
 * Theme configuration
 * Maps design tokens to CSS variables and provides theme utilities
 */

import { tokens } from './tokens';

export const theme = {
  ...tokens,
  // Semantic color mappings
  semantic: {
    text: {
      primary: tokens.colors.gray[900],
      secondary: tokens.colors.gray[600],
      disabled: tokens.colors.gray[400],
      inverse: tokens.colors.white,
    },
    background: {
      default: tokens.colors.white,
      paper: tokens.colors.gray[50],
      disabled: tokens.colors.gray[100],
    },
    border: {
      default: tokens.colors.gray[300],
      focus: tokens.colors.primary[500],
      error: tokens.colors.error[500],
      success: tokens.colors.success[500],
    },
  },
} as const;

export type Theme = typeof theme;

/**
 * Generate CSS variables from theme
 */
export function generateCSSVariables(theme: Theme): string {
  const cssVars: string[] = [];

  // Colors
  Object.entries(theme.colors).forEach(([colorName, colorValues]) => {
    if (typeof colorValues === 'string') {
      cssVars.push(`--color-${colorName}: ${colorValues};`);
    } else {
      Object.entries(colorValues).forEach(([shade, value]) => {
        cssVars.push(`--color-${colorName}-${shade}: ${value};`);
      });
    }
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars.push(`--spacing-${key}: ${value};`);
  });

  // Typography
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`--font-size-${key}: ${value};`);
  });
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    cssVars.push(`--font-weight-${key}: ${value};`);
  });

  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    cssVars.push(`--radius-${key}: ${value};`);
  });

  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    cssVars.push(`--shadow-${key}: ${value};`);
  });

  // Semantic colors
  Object.entries(theme.semantic.text).forEach(([key, value]) => {
    cssVars.push(`--text-${key}: ${value};`);
  });
  Object.entries(theme.semantic.background).forEach(([key, value]) => {
    cssVars.push(`--bg-${key}: ${value};`);
  });
  Object.entries(theme.semantic.border).forEach(([key, value]) => {
    cssVars.push(`--border-${key}: ${value};`);
  });

  return `:root {\n  ${cssVars.join('\n  ')}\n}`;
}

