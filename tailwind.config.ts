import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rose': '#912758',
        'rose-hover': '#542138',
      },
      screens: {
        '3xl': '1920px',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
      },
      maxWidth: {
        'container': '1480px',
      },
    },
  },
  plugins: [],
};
export default config;
