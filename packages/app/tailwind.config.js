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
        "background": "var(--vt-c-white)",
        "background-dark": "var(--vt-c-black)",
        "text": "var(--vt-c-text-light-1)",
        "text-dark": "var(--vt-c-text-dark-2)",
      },
    },
  },
  plugins: [],
}

