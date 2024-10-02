/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "var(--color-background)", // "color(from var(--color-background) / <alpha-value>)",
        "background-soft": "var(--color-background-soft)",
        "background-mute": "var(--color-background-mute)",
        "border": "var(--color-border)",
        "border-hover": "var(--color-border-hover)",
        "heading": "var(--color-heading)",
        "text": "var(--color-text)",
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}
