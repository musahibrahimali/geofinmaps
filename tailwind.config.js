/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        'brand': "#42BFDD",
        'brand-dim': "#BBE6E4",
        'brand-white': "#FFFFFF",
        'brand-gray': "#F0F6F6",
        'brand-blue': "#0052CC",
        'custom-green': "#19857b",
        'custom-green-deep': "#037c70",
        'bOrange': "#C73600",
        'dirty': "#F5EBDF",
        'lighten-blue': "#E9F0F4",
        'build-color': "#F9F6F4",
        'light-color': "#F9F6F4",
        'blog-color': '#F0F2F5',
        'error-bg': '#007aff',
        'deep-yellow': "#FA8A00",
        'light-blue': "#03A9F4",
        'dark-color': {
          800: "#424242",
          900: "#303030",
        }
      },
      backgroundImage: theme => ({
        'auth-landing': "url('https://source.unsplash.com/random')",
        'sign-up': "url('https://source.unsplash.com/random')",
        'sign-in': "url('https://source.unsplash.com/random')",
        'cable': "url('https://source.unsplash.com/random')",
      }),
      boxShadow: {
        input: "0px 7px 20px rgba(0, 0, 0, 0.03)",
        pricing: "0px 39px 23px -27px rgba(0, 0, 0, 0.04)",
        "switch-1": "0px 0px 5px rgba(0, 0, 0, 0.15)",
        testimonial: "0px 60px 120px -20px #EBEFFD",
      },
      height: {
        'video': "40rem",
        '100': "25rem",
        '110': "26rem",
        '120': "28rem",
        '130': "30rem",
        '140': "35rem",
        '150': "40rem",
        '160': "45rem",
        '170': "50rem",
        '180': "55rem",
        '190': "60rem",
      },
      /* animations */
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        blob: "blob 7s infinite"
      },

      /* keyframes */
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1.0)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1.0)",
          },
        },

        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
    },
  },
  plugins: [],
}
