export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffd700',
        'bg-dark': '#1e1e2e',
        'bg-darker': '#16161e',
        'bg-light': '#2d2d44',
      }
    },
  },
  plugins: [],
}