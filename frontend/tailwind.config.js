/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyra: {
          bg: "#0a0512",
          bgSecondary: "#120924",
          card: "rgba(22, 12, 38, 0.75)",
          cardHover: "rgba(35, 18, 60, 0.85)",
          border: "rgba(255, 45, 117, 0.3)",
          borderHover: "rgba(255, 45, 117, 0.6)",
          pink: "#ff2d75",
          pinkLight: "#ff4d8d",
          rose: "#ff6584",
          purple: "#9d4edf",
          violet: "#7b2cbf",
          lavender: "#c77dff",
          glow: "rgba(255, 45, 117, 0.35)",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'cyra-glow': '0 0 30px -5px rgba(255, 45, 117, 0.4)',
        'cyra-purple': '0 0 30px -5px rgba(157, 78, 223, 0.4)',
        'cyra-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
