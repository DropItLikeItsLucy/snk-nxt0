// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config = {
  // ... other configurations (darkMode, content, theme)
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'), // <-- Add this line
  ],
  // ... rest of the config
} satisfies Config;

export default config;