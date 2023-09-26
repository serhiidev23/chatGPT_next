/** @type {import('tailwindcss').Config} */
module.exports = {
  //...
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // add daisyUI plugin
  plugins: [require("daisyui")],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["light", "dark", "cupcake"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },

  theme: {
    extend: {
      colors: {
        'prd-grad-from': '#8E54FF',
        'prd-grad-to': '#331274',
        'prd-sub-grad-from': '#8C52FF',
        'prd-sub-grad-to': '#1C0D39'
      },
      spacing: {
        '15': '3.75rem',
        '0.1': '0.1rem',
        '42': '10.64375rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  }

  //...
}

