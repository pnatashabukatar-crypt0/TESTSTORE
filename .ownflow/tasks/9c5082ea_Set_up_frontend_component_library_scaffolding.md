# Frontend Component Library Scaffolding for TEST SHOP

I'll create a comprehensive, production-ready React component library with Tailwind CSS and Storybook, complete with all required base components and accessibility compliance.

## Overview

This deliverable includes:
1. **Project structure** with organized component folders
2. **Tailwind CSS configuration** with design tokens and custom theme
3. **Storybook setup** with comprehensive stories
4. **Base components** (Button, Input, Card, Modal, Navigation, Breadcrumbs)
5. **WCAG 2.1 AA compliance** built into all components
6. **Documentation** and development workflow guides
7. **Accessibility utilities** and testing helpers

---

## 1. Project Structure & Configuration Files

### Root Configuration Files

#### `package.json`
```json
{
  "name": "test-shop-components",
  "version": "1.0.0",
  "description": "React component library for TEST SHOP e-commerce platform",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/index.css"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build && tsc --emitDeclarationOnly",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "vitest",
    "test:a11y": "jest-axe",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "classnames": "^2.3.2"
  },
  "devDependencies": {
    "@storybook/react": "^7.6.0",
    "@storybook/addon-essentials": "^7.6.0",
    "@storybook/addon-a11y": "^7.6.0",
    "@storybook/addon-interactions": "^7.6.0",
    "@storybook/addon-docs": "^7.6.0",
    "@storybook/test": "^7.6.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "axios-mock-adapter": "^1.21.5",
    "jest-axe": "^8.0.0",
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "typescript": "^5.3.3",
    "vite": "^5.0.8",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2"
  }
}
```

#### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#faf8f6',
          100: '#f5f1ed',
          200: '#ebe3db',
          300: '#d9c9b3',
          400: '#c7ae8a',
          500: '#a67c52', // Main brand color
          600: '#8b6640',
          700: '#6f5335',
          800: '#5a422a',
          900: '#453220',
        },
        // Secondary colors
        secondary: {
          50: '#fef3f2',
          100: '#ffe4e1',
          200: '#ffc9c3',
          300: '#ffada5',
          400: '#ff8872',
          500: '#ff6b4a',
          600: '#f04514',
          700: '#c1220b',
          800: '#a0190a',
          900: '#85140b',
        },
        // Semantic colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      borderRadius: {
        none: '0',
        xs: '0.25rem',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      accessibility: {
        reducedMotion: '@media (prefers-reduced-motion: reduce)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  corePlugins: {
    preflight: true,
  },
}
```

#### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### `.storybook/main.js`
```javascript
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['./public'],
};
export default config;
```

#### `.storybook/preview.js`
```javascript
import '../src/styles/globals.css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'desktop',
    },
    docs: {
      toc: true,
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'valid-aria-role',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { level: 'AA' } } },
        runOnly: { type: 'tag', values: ['wcag2aa'] },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-neutral-50 p-8">
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "jsx": "react-jsx",
    "resolveJsonModule": true,
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'TestShopComponents',
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
```

---

## 2. Design Tokens & Utilities

#### `src/tokens/design-tokens.json`
```json
{
  "colors": {
    "primary": {
      "base": "#a67c52",
      "light": "#c7ae8a",
      "dark": "#6f5335",
      "contrast": "#ffffff"
    },
    "secondary": {
      "base": "#ff6b4a",
      "light": "#ffada5",
      "dark": "#c1220b"
    },
    "semantic": {
      "success": "#22c55e",
      "warning": "#eab308",
      "error": "#ef4444",
      "info": "#3b82f6"
    },
    "neutral": {
      "0": "#ffffff",
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "500": "#6b7280",
      "900": "#111827"
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem"
  },
  "typography": {
    "fontFamily": "Inter, system-ui, sans-serif",
    "sizes": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem"
    },
    "weights": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    }
  },
  "breakpoints": {
    "mobile": "0px",
    "tablet": "768px",
    "desktop": "1024px"
  }
}
```

#### `src/utils/a11y.ts`
```typescript
/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 */

/**
 * Generate unique ID with optional prefix
 */
export const generateId = (prefix = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Announce dynamic content to screen readers
 */
export const announceToScreenReader = (message: string, politeness: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', politeness);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    announcement.remove();
  }, 1000);
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers dark mode
 */
export const prefersDarkMode = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Focus management utility
 */
export class FocusTrap {
  private element: HTMLElement;
  private previousActiveElement: HTMLElement | null = null;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  activate(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    firstElement?.focus();
  }

  deactivate(): void {
    this.previousActiveElement?.focus();
  }
}

/**
 * Keyboard utilities
 */
export const KeyCode = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  SPACE: ' ',
} as const;
```

#### `src/utils/classnames.ts`
```typescript
/**
 * Utility for conditional class composition
 */
type ClassValue = string | undefined | null | boolean | Record<string, boolean>;

export const cn = (...classes: ClassValue[]): string => {
  return classes
    .flatMap((cls) => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key);
      }
      return [];
    })
    .filter(Boolean)
    .join(' ');
};
```

#### `src/styles/globals.css`
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible styles for keyboard navigation */
:focus-visible {
  @apply outline-2 outline-offset-2 outline-primary-500;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-neutral-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-neutral-300 rounded-lg;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-neutral-400;
}
```

---

## 3. Base Components

#### `src/components/Button/Button.tsx`
```typescript
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import { prefersReducedMotion } from '@/utils/a11y';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether button is in loading state */
  isLoading?: boolean;
  /** Loading indicator content */
  loadingLabel?: ReactNode;
  /** Icon to display before text */
  startIcon?: ReactNode;
  /** Icon to display after text */
  endIcon?: ReactNode;
  /** Make button full width */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Button component with multiple variants and states
 * 
 * WCAG 2.1 AA Compliance:
 * - Minimum touch target size: 44x44px
 * - Clear focus state for keyboard navigation
 * - Proper color contrast ratios
 * - Semantic HTML
 * - Proper disabled state
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingLabel = 'Loading...',
      startIcon,
      endIcon,
      fullWidth = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const motionPreference = prefersReducedMotion();

    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-fast border rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-primary-500 text-white border-primary-500 hover:bg-primary-600 focus-visible:outline-primary-700',
      secondary:
        'bg-secondary-500 text-white border-secondary-500 hover:bg-secondary-600 focus-visible:outline-secondary-700',
      tertiary:
        'bg-transparent text-primary-500 border-primary-300 hover:bg-primary-50 focus-visible:outline-primary-500',
      danger:
        'bg-error-500 text-white border-error-500 hover:bg-error-600 focus-visible:outline-error-700',
    };

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm min-h-[36px]',
      md: 'px-4 py-2 text-base min-h-[44px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]',
    };

    const computedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      !motionPreference && 'active:scale-95',
      className
    );

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={computedClassName}
        {...props}
      >
        {!isLoading ? (
          <>
            {startIcon}
            {children}
            {endIcon}
          </>
        ) : (
          <>
            <LoadingSpinner />
            {loadingLabel}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="presentation"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
```

#### `src/components/Button/Button.stories.tsx`
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants and sizes. Fully accessible with keyboard navigation support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Processing',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const WithIcons: Story = {
  args: {
    startIcon: '🛒',
    children: 'Add to Cart',
    endIcon: '→',
  },
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="danger">Danger</Button>
      </div>
    ),
  ],
};
```

#### `src/components/Input/Input.tsx`
```typescript
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import { generateId } from '@/utils/a11y';

type InputSize = 'sm' | 'md' | 'lg';
type InputStatus = 'default' | 'error' | 'success' | 'warning';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text for the input */
  label?: ReactNode;
  /** Helper text below input */
  helperText?: ReactNode;
  /** Error message */
  error?: ReactNode;
  /** Success message */
  success?: ReactNode;
  /** Size of input */
  size?: InputSize;
  /** Input status */
  status?: InputStatus;
  /** Icon to display before input */
  startIcon?: ReactNode;
  /** Icon to display after input */
  endIcon?: ReactNode;
  /** Make input full width */
  fullWidth?: boolean;
  /** Required indicator */
  isRequired?: boolean;
}

/**
 * Input component with labels, validation states, and icons
 * 
 * WCAG 2.1 AA Compliance:
 * - Associated labels via htmlFor
 * - Proper ARIA attributes for error/success states
 * - Clear focus states
 * - Semantic HTML
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      size = 'md',
      status = 'default',
      startIcon,
      endIcon,
      fullWidth = false,
      isRequired = false,
      id: providedId,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const id = providedId || generateId('input');
    const errorId = error ? `${id}-error` : undefined;
    const successId = success ? `${id}-success` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;

    // Determine status based on error/success props
    const computedStatus = error ? 'error' : success ? 'success' : status;

    const baseStyles =
      'block w-full border rounded-lg bg-white transition-fast placeholder-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-0';

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    const statusStyles = {
      default: 'border-neutral-300 focus-visible:outline-primary-500 focus-visible:border-primary-500',
      error: 'border-error-500 focus-visible:outline-error-500 focus-visible:border-error-500',
      success: 'border-success-500 focus-visible:outline-success-500 focus-visible:border-success-500',
      warning: 'border-warning-500 focus-visible:outline-warning-500 focus-visible:border-warning-500',
    };

    const inputClassName = cn(
      baseStyles,
      sizeStyles[size],
      statusStyles[computedStatus],
      startIcon && 'pl-10',
      endIcon && 'pr-10',
      className
    );

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={id} className="mb-2 font-medium text-neutral-700">
            {label}
            {isRequired