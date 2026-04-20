// tailwind.config.js
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffc1cc',      // baby pink
        secondary: '#ffe4e6',    // lighter pink
        accent: '#ec4899', 
      },
      backgroundImage: {         // ← ADD THIS BLOCK HERE
        'hero-gradient': 'linear-gradient(135deg, #ffe4e6 0%, #ffc1cc 50%, #fff 100%)',
      },
    },
  },
  plugins: [],
})
