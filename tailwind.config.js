/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#243624',
        secondary: '#974730',
        tertiary: '#2e3425',
        surface: '#f9faf5',
        'surface-container-low': '#f3f4ef',
        'surface-container-high': '#e8e9e4',
        'surface-container-highest': '#e2e3de',
        'outline-variant': 'rgba(195, 200, 191, 0.2)',
        'on-surface': '#1a1c19',
        'on-surface-variant': '#434842',
        'on-primary': '#ffffff',
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}